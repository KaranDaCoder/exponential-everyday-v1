"use server";

import connectDb from "@/lib/dbConnect";
import { validateLoggedInUser } from "./users";
import { DateTime } from "luxon";
import { Decimal } from "@prisma/client/runtime/library";
import { calculateHabitMetric, validateDates } from "@/lib/calculations";




export const getActiveTrackers = async () => {
  const { success, userId } = await validateLoggedInUser();
  if (!success) {
    throw Error(`User not authenticated...`)
  }
  try {
    const fetchedTrackers = await connectDb.tracker.findMany({
      where: {
        status: 'ACTIVE',
        is_tracker_updated: false,
        userId
      },
      include: {
        habit: true
      },
      orderBy: {
        logged_at: "desc"
      }
    })
    const trackers = fetchedTrackers.map((tracker) => ({
      ...tracker,
      daily_difficulty: tracker.daily_difficulty?.toNumber(),
      expected_difficulty: tracker.expected_difficulty?.toNumber(),
    }));
    return {
      success: true,
      data: trackers,
      message: 'trackers fetched successfully.'
    }
  } catch (error) {
    return {
      success: false,
      data: {},
      message: `errors fetching trackers. ${error.message}`
    }
  }
}


export const bulkUpdateTrackers = async () => {
  const { success, userId } = await validateLoggedInUser();
  const today = DateTime.now().setZone('system').startOf('day');

  if (!success) {
    throw new Error("User not authenticated...");
  }

  try {

    await connectDb.tracker.updateMany({
      where: {
        status: 'UPCOMING',
        is_tracker_updated : false,
        logged_at : {lte : today.toJSDate()}
      }, 
      data: {
        status :'ACTIVE',
        logged_at : today.toJSDate()
      }
    })
    const fetchActiveTrackers = await connectDb.tracker.findMany({
      where: {
        status: 'ACTIVE',
        is_tracker_updated: false,
        logged_at: { lt: today.toJSDate() }
      },
      include: {
        habit: true
      }
    })

    if (!fetchActiveTrackers) {
      console.log(`NO TRACKERS TO UPDATE...`)
      return `NO TRACKERS`
    }

    fetchActiveTrackers.map(async track => {
      const createTrackerToUpdate = {
        status: 'MISSED',
        is_tracker_updated: true,
        daily_difficulty: new Decimal(track.habit.current_difficulty)
      }
      const updatedTracker = await connectDb.tracker.update({
        where: { id: track.id },
        data: createTrackerToUpdate
      })
      return createTrackerToUpdate
    })

    return {
      success : true,
      message : 'trackers bulk updated successfully'
    };
  } catch (error) {
    console.error("Error updating trackers:", error);
    throw new Error("Failed to bulk update trackers");
  }
};




//02/03:
export const createTrackers = async () => {
  const { success, userId } = await validateLoggedInUser();
  const today = DateTime.now().setZone('system').startOf('day');
  if (!success) {
    throw new Error("User not authenticated...");
  }
  try {
    const active_habits = await connectDb.habit.findMany({
      where: {
        status: 'ACTIVE',
        userId
      }
    })
    Promise.all(active_habits.map(async habit => {
      const { id: habitId } = habit;
      const get_recent_tracker = await connectDb.tracker.findFirst({
        where: {
          habitId,
        },
        orderBy: {
          logged_at: "desc"
        }
      })

      const { logged_at, daily_difficulty, expected_difficulty } = get_recent_tracker;
      if (logged_at < today.toJSDate()) { //make is <
        return await connectDb.tracker.create({
          data: {
            notes: '',
            is_default: false,
            daily_difficulty: new Decimal(daily_difficulty),
            expected_difficulty: new Decimal(expected_difficulty * 1.01),
            status: 'ACTIVE',
            is_tracker_updated: false,
            logged_at: today.toJSDate(),
            habitId,
            userId
          }
        })
      }
    }))
    return { success: true, message: 'Trackers created successfully for active habits.' };
  } catch (error) {
    console.error('Error creating trackers:', error.message);
    return { success: false, message: `Error creating trackers: ${error.message}` };
  }
}



export const updateSingleTracker = async (trackerId, trackerNotes) => {
  const { success, userId } = await validateLoggedInUser();
  if (!success) {
    throw new Error("User not authenticated...");
  }

  try {
    // Fetch the tracker and its related habit in one query
    const fetchTracker = await connectDb.tracker.findUnique({
      where: { id: trackerId },
      include: {
        habit: true,
      },
    });

    if (!fetchTracker || fetchTracker.status !== 'ACTIVE' || fetchTracker.is_tracker_updated) {
      throw new Error("Tracker not found or already updated.");
    }

    const newDailyDifficulty = new Decimal(fetchTracker.habit.current_difficulty * 1.01);

    // Use a transaction for atomic updates
    await connectDb.$transaction([
      connectDb.tracker.update({
        where: { id: trackerId },
        data: {
          status: 'COMPLETED',
          notes: trackerNotes,
          is_tracker_updated: true,
          daily_difficulty: newDailyDifficulty,
        },
      }),
      connectDb.habit.update({
        where: { id: fetchTracker.habit.id },
        data: {
          current_difficulty: newDailyDifficulty,
          current_strength: calculateHabitMetric(newDailyDifficulty).calc_start_strength
        },
      }),
    ],
    );
    return { success: true };
  } catch (error) {
    console.error(`Error updating tracker ${trackerId}:`, error.message);
    throw new Error("Failed to update tracker.");
  }
};
