'use server';

import { calculateHabitMetric, validateDates } from '@/lib/calculations';
import connectDb from '@/lib/dbConnect';
import { registerUser } from '@/lib/registerUser';
import { Decimal } from '@prisma/client/runtime/library';
import { DateTime } from 'luxon';
import { validateLoggedInUser } from './users';
import { revalidatePath } from 'next/cache';

// Create New Habit
export const createNewHabit = async (data) => {
  const { success, userId } = await validateLoggedInUser();
  if (!success) {
    throw Error(`User not authenticated...`);
  }

  let { category, name, description, set_reminder, start_difficulty, start_date } = data;

  try {
    // Check if a habit with the same name already exists for the user
    const isHabitExist = await connectDb.habit.findUnique({
      where: {
        userId_name: {
          userId,
          name,
        },
      },
    });

    if (isHabitExist) {
      return {
        success: false,
        error: 'Oops, the habit with the same name already exists.',
        message: 'Oops, the habit with the same name already exists.',
      };
    }

    // Parse start_date
    const today = DateTime.now().setZone('system').startOf('day');
    if (typeof start_date === 'string') {
      start_date = DateTime.fromISO(start_date).setZone('system').startOf('day');
    } else {
      start_date = DateTime.fromJSDate(start_date).setZone('system').startOf('day');
    }

    // Validate dates
    const { success: validateSuccess, message, status } = validateDates(today, start_date);
    if (!validateSuccess) {
      throw Error(message);
    }

    // Determine habit status based on start date
    const habitStatus = start_date > today ? 'UPCOMING' : 'ACTIVE';

    // Calculate initial strength
    const { calc_start_strength } = calculateHabitMetric(start_difficulty);

    //transaction to ensure both habit and tracker are created atomically
    await connectDb.$transaction(async (prisma) => {
      // Create the habit
      const create_habit = await prisma.habit.create({
        data: {
          category,
          name,
          description,
          start_date: start_date.toJSDate(),
          status: habitStatus,
          set_reminder,
          start_strength: calc_start_strength,
          current_strength: calc_start_strength,
          start_difficulty: new Decimal(start_difficulty),
          current_difficulty: new Decimal(start_difficulty),
          userId,
        },
      });

      if (!create_habit) {
        throw new Error(`Failed to create habit.`);
      }

      // Create the default tracker only if the habit is ACTIVE
      if (habitStatus === 'ACTIVE') {
        const trackerCreation = await prisma.tracker.create({
          data: {
            notes: 'First tracker for the habit',
            logged_at: start_date.toJSDate(),
            daily_difficulty: new Decimal(start_difficulty),
            expected_difficulty: new Decimal(start_difficulty * 1.01),
            habitId: create_habit.id,
            status: 'ACTIVE',
            is_tracker_updated: false,
            is_default: true,
            userId
          },
        });

        if (!trackerCreation) {
          throw new Error(`Failed to create tracker.`);
        }
      } else {
        const trackerCreation = await prisma.tracker.create({
          data: {
            notes: 'First tracker for the habit',
            logged_at: start_date.toJSDate(),
            daily_difficulty: new Decimal(start_difficulty),
            expected_difficulty: new Decimal(start_difficulty * 1.01),
            habitId: create_habit.id,
            status: 'UPCOMING',
            is_tracker_updated: false,
            is_default: true,
            userId
          },
        });

        if (!trackerCreation) {
          throw new Error(`Failed to create tracker.`);
        }
      }

      return create_habit;
    });

    return {
      success: true,
      message: habitStatus === 'UPCOMING'
        ? 'Habit created successfully and marked as UPCOMING.'
        : 'Habit and tracker created successfully.',
    };

  } catch (error) {
    console.error(error.message);
    return {
      success: false,
      error: `Error creating habit: ${error.message}`,
      message: `Error creating habit: ${error.message}`,
    };
  }
};



// Get all habits
export const getUserHabits = async () => {
  const { success, userId } = await validateLoggedInUser();
  if (!success) {
    throw Error(`User not authenticated...`)
  }
  try {
    const fetchedHabits = await connectDb.habit.findMany({
      where: {
        userId,
      },
      include: {
        trackers: true
      },
      orderBy: {
        start_date: 'desc',
      },
    });

    // Serialize Decimal values to plain numbers
    const habits = fetchedHabits.map((habit) => ({
      ...habit,
      start_difficulty: habit.start_difficulty?.toNumber(),
      current_difficulty: habit.current_difficulty?.toNumber(),
      trackers: habit.trackers?.map((tracker) => ({
        ...tracker,
        daily_difficulty: tracker.daily_difficulty?.toNumber(),
        expected_difficulty: tracker.expected_difficulty?.toNumber()
      }))
    }));

    return {
      success: true,
      data: habits,
      message: `user habits fetched successfully`,
    };
  } catch (error) {
    return {
      success: false,
      error: `Error fetching habits : ${error.message}`,
      message: `Error fetching habits : ${error.message}`,
    }
  }
};

//get a single habit
export const getAHabit = async (habitId) => {
  const {
    data: { id },
  } = await registerUser();
  try {
    const get_habit = await connectDb.habit.findUnique({
      where: {
        userId: id,
        id: habitId
      },
      include: {
        trackers: true
      }
    })
    return {
      success: true,
      data: get_habit,
      message: `user single habit fetched successfully`,
    };
  } catch (error) {
    return {
      success: false,
      data: '',
      message: `Error fetching habit : ${error.message}`,
    }
  }
}


//BULK Update Habit Statuses -- inngest function later
export const bulkUpdateHabits = async () => {
  const today = DateTime.now().setZone('system').startOf('day');

  try {
    // Update all habits with 'UPCOMING' status to 'ACTIVE' if the start_date matches today
    const updatedHabits = await connectDb.habit.updateMany({
      where: {
        status: 'UPCOMING',
        start_date: today.toJSDate(),
        NOT: {
          status: 'DISABLED',
        },
      },
      data: {
        status: 'ACTIVE',
      },
    });
    return updatedHabits;
  } catch (error) {
    console.error(`Error updating habits: ${error.message}`);
    throw new Error(`Error updating habits: ${error.message}`);
  }
};

export const deleteHabit = async (habitId) => {
  const { success, userId } = await validateLoggedInUser();
  const today = DateTime.now().setZone('system').startOf('day');
  if (!success) {
    throw new Error("User not authenticated...");
  }
  try {
      const is_habit = await connectDb.habit.findFirst({
        where: {
            userId,
            id:habitId
        }
      })
      if(!is_habit) {
        throw new Error(`Habit does not exist or deleted`)
      }
      await connectDb.habit.delete({where : {id: habitId}});
      revalidatePath('/habits')

      return {
        success : true,
        data:  'habit deleted successfully',
        message:  'habit deleted successfully',
      }
  } catch (error) {
    throw new Error(error.message)
  }
}