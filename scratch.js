if (tempStatus === 'COMPLETED') {
 data = {
  status: "COMPLETED",
  is_tracker_updated: true,
  daily_difficulty: new Decimal(tracker.habit.current_difficulty * 1.01), // Use the fetched tracker data
  logged_at: tracker.logged_at, // Use the fetched tracker data
 }
} else {
 data = {
  status: "MISSED",
  is_tracker_updated: true,
  daily_difficulty: new Decimal(tracker.habit.current_difficulty), // Use the fetched tracker data
  logged_at: tracker.logged_at, // Use the fetched tracker data
 }
}
// logged_at: { equals: DateTime.fromISO("2025-02-04T06:00:00", { zone: "system" }).startOf("day") }

await connectDb.tracker.create({
 data: {
  notes: '',
  daily_difficulty: new Decimal(current_difficulty),
  expected_difficulty: new Decimal(current_difficulty * 1.01),
  logged_at: start_date,
  is_tracker_updated: false,
  status: 'ACTIVE',
  userId,
  habitId
 }
})