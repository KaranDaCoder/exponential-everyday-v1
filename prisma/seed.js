import { PrismaClient, HabitCategory, HabitStatus, HabitStrength } from '@prisma/client';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

// Utility functions
const getRandomDateInJanuary = () => {
 const randomDay = Math.floor(Math.random() * 2) + 1; // Random day between 1 and 31
 return DateTime.fromObject({ year: 2025, month: 2, day: randomDay });
};

const getStatus = (startDate) => {
 const today = DateTime.now();
 return startDate > today ? HabitStatus.UPCOMING : HabitStatus.ACTIVE;
};

const getRandomReminder = () => Math.random() > 0.5;
const getRandomDifficulty = () => Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10

const calculateHabitMetric = (difficulty) => {
 if (difficulty >= 10) {
  return {
   start_strength: HabitStrength.FLYING,
   current_strength: HabitStrength.FLYING,
   current_difficulty: difficulty,
   start_difficulty: difficulty
  };
 } else if (difficulty >= 8) {
  return {
   start_strength: HabitStrength.SPRINTING,
   current_strength: HabitStrength.SPRINTING,
   current_difficulty: difficulty,
   start_difficulty: difficulty
  };
 } else if (difficulty >= 5) {
  return {
   start_strength: HabitStrength.RUNNING,
   current_strength: HabitStrength.RUNNING,
   current_difficulty: difficulty,
   start_difficulty: difficulty
  };
 } else if (difficulty >= 3) {
  return {
   start_strength: HabitStrength.WALKING,
   current_strength: HabitStrength.WALKING,
   current_difficulty: difficulty,
   start_difficulty: difficulty
  };
 } else {
  return {
   start_strength: HabitStrength.CRAWLING,
   current_strength: HabitStrength.CRAWLING,
   current_difficulty: difficulty,
   start_difficulty: difficulty
  };
 }
};

// Seed data
const habitsArray = [
 {
  name: "Morning Mindset Reset",
  description: "Start your day with positivity by setting intentions.",
  category: HabitCategory.MENTAL_WELLBEING,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  userId: "cm6e1rwab0000rb3m1rwp1s9s",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Declutter One Space",
  description: "Spend 10 minutes a day decluttering an area of your home or workspace.",
  category: HabitCategory.SUSTAINABILITY,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  userId: "cm6e1rwab0000rb3m1rwp1s9s",
  ...calculateHabitMetric(getRandomDifficulty())
 },
 {
  name: "Practice Sustainability",
  description: "Implement small eco-friendly actions like recycling and reducing waste.",
  category: HabitCategory.SUSTAINABILITY,
  start_date: getRandomDateInJanuary(),
  status: getStatus(getRandomDateInJanuary()),
  set_reminder: getRandomReminder(),
  userId: "cm6e1rwab0000rb3m1rwp1s9s",
  ...calculateHabitMetric(getRandomDifficulty())
 },
];

async function main() {
 // Seed user data first (if necessary), assuming `userId` is available
 const user = {
  userId: 'cm6e1rwab0000rb3m1rwp1s9s'
 };

 // Insert habits data
 for (const habit of habitsArray) {
  await prisma.habit.create({
   data: habit,
  });
 }

 console.log("Seeding completed!");
}

main()
 .catch((e) => {
  console.error(e);
  process.exit(1);
 })
 .finally(async () => {
  await prisma.$disconnect();
 });
