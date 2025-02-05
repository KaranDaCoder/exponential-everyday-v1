import connectDb from "@/lib/dbConnect";
import { inngest } from "./client";
import { DateTime } from "luxon";

export const helloWorld = inngest.createFunction(
 { id: "hello-world" },
 { event: "test/hello.world" },
 async ({ event, step }) => {
  await step.sleep("wait-a-moment", "1s");
  return { message: `Hello ${event.data.email}!` };
 },
);

// import { connectDb } from "./db"; // Adjust this to your database connection

export const bulkUpdateHabits = inngest.createFunction(
 {
  id: "bulk-update-habits",
  name: "Bulk Update Habits"
 },
 { cron: "*/5 * * * *" },
 async ({ event, step }) => {
  const today = DateTime.now().setZone("system").startOf("day");

  try {
   console.log(`UPDATING HABITS FROM INNFGEST`)
   await step.run("Updating Habits", async () => {
    // Update all habits with 'UPCOMING' status to 'ACTIVE' if the start_date matches today
    const updatedHabits = await connectDb.habit.updateMany({
     where: {
      status: "UPCOMING",
      start_date: today.toJSDate(),
      NOT: {
       status: "DISABLED",
      },
     },
     data: {
      status: "ACTIVE",
     },
    });

    console.log(`Successfully updated ${updatedHabits.count} habits to 'ACTIVE'.`);
    return updatedHabits;
   });
  } catch (error) {
   console.error(`Error updating habits: ${error.message}`);
   throw new Error(`Error updating habits: ${error.message}`);
  }
 }
);


export const bulkUpdateTrackers = inngest.createFunction(
 
 {
  id: "bulk-update-trackers",
  name: "Bulk Update Trackers",
 },
 { cron: "*/5 * * * *" }, // Runs daily at midnight
 async ({ event, step }) => {
  const today = DateTime.now().setZone("system").startOf("day");

  try {
   console.log(`UPDATING TRACKERS FROM INNFGEST`)
   // await step.run("Authenticate User", async () => {
   //  const { success, userId } = await validateLoggedInUser();

   //  if (!success) {
   //   throw new Error("User not authenticated...");
   //  }
   //  return userId;
   // });

   await step.run("Update Upcoming Trackers", async () => {
    await connectDb.tracker.updateMany({
     where: {
      status: "UPCOMING",
      is_tracker_updated: false,
      logged_at: { lte: today.toJSDate() },
     },
     data: {
      status: "ACTIVE",
      logged_at: today.toJSDate(),
     },
    });
   });

   const fetchActiveTrackers = await step.run("Fetch Active Trackers", async () => {
    return connectDb.tracker.findMany({
     where: {
      status: "ACTIVE",
      is_tracker_updated: false,
      logged_at: { lt: today.toJSDate() },
     },
     include: {
      habit: true,
     },
    });
   });

   if (!fetchActiveTrackers || fetchActiveTrackers.length === 0) {
    console.log(`NO TRACKERS TO UPDATE...`);
    return `NO TRACKERS`;
   }

   await step.run("Update Missed Trackers", async () => {
    await Promise.all(
     fetchActiveTrackers.map(async (track) => {
      const createTrackerToUpdate = {
       status: "MISSED",
       is_tracker_updated: true,
       daily_difficulty: new Decimal(track.habit.current_difficulty),
      };
      await connectDb.tracker.update({
       where: { id: track.id },
       data: createTrackerToUpdate,
      });
     })
    );
   });

   return {
    success: true,
    message: "Trackers bulk updated successfully",
   };
  } catch (error) {
   console.error("Error updating trackers:", error);
   throw new Error("Failed to bulk update trackers");
  }
 }
);
