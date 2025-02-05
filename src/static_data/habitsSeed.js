import { calculateHabitMetric } from "@/lib/calculations";
import { HabitCategory } from "@prisma/client";

const getRandomDateInJanuary = () => {
 const randomDay = Math.floor(Math.random() * 31) + 1; // Random day between 1 and 31
 return DateTime.fromObject({ year: 2025, month: 1, day: randomDay });
};

const getStatus = (startDate) => {
 const today = DateTime.now();
 return startDate > today ? "UPCOMING" : "ACTIVE";
};

const getRandomReminder = () => Math.random() > 0.5;
export const habitsArray = [
 {
  name: "Morning Mindset Reset",
  description: "Start your day with positivity by setting intentions.",
  category: HabitCategory.MENTAL_WELLBEING,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Write One Gratitude",
  description: "Write down one thing you're grateful for daily.",
  category: HabitCategory.MENTAL_WELLBEING,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Practice Positive Affirmations",
  description: "Recite positive affirmations to boost self-confidence.",
  category: HabitCategory.MENTAL_WELLBEING,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Healthy Plate Check",
  description: "Ensure you're getting a balanced meal with fruits and vegetables.",
  category: HabitCategory.HEALTH_FITNESS,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Hydrate and Thrive",
  description: "Drink water throughout the day to stay hydrated and energized.",
  category: HabitCategory.HEALTH_FITNESS,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Walk the Wellness Path",
  description: "Take a brisk walk daily to improve your physical health.",
  category: HabitCategory.HEALTH_FITNESS,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Plan Your Tomorrow Today",
  description: "Organize your tasks for the next day to stay ahead.",
  category: HabitCategory.PRODUCTIVITY,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Budget Your Day Wisely",
  description: "Allocate time to each task to optimize productivity.",
  category: HabitCategory.PRODUCTIVITY,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Read for Growth",
  description: "Read a book or article every day to expand your knowledge.",
  category: HabitCategory.PRODUCTIVITY,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Express Your Love",
  description: "Show appreciation or love to someone in your life daily.",
  category: HabitCategory.RELATIONSHIPS,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Have a Heart-to-Heart",
  description: "Engage in a meaningful conversation with a loved one every day.",
  category: HabitCategory.RELATIONSHIPS,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Strengthen Bonds",
  description: "Spend quality time with friends or family, nurturing relationships.",
  category: HabitCategory.RELATIONSHIPS,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Mindful Breathing",
  description: "Take 10 minutes daily to focus on your breath and center yourself.",
  category: HabitCategory.MENTAL_WELLBEING,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "No Sugar After Lunch",
  description: "Avoid consuming sugar after lunch to maintain steady energy levels.",
  category: HabitCategory.HEALTH_FITNESS,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Declutter One Space",
  description: "Spend 10 minutes a day decluttering an area of your home or workspace.",
  category: HabitCategory.SUSTAINABILITY,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Unplug Before Bedtime",
  description: "Turn off electronic devices 30 minutes before bed to improve sleep.",
  category: HabitCategory.SUSTAINABILITY,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Practice Sustainability",
  description: "Implement small eco-friendly actions like recycling and reducing waste.",
  category: HabitCategory.SUSTAINABILITY,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  clerkUserId: "user_2sB66JsAn1CzAM32dUbpHHmCXyr",
  ...calculateHabitMetric(getRandomDifficulty())
 },
];