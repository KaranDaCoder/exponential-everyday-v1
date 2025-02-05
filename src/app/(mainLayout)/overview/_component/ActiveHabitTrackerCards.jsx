import { reduceCategory } from '@/static_data/categories'
import HabitTrackerCard from './HabitTrackerCard';
import { getActiveTrackers } from '@/actions/habitTrackers';


const ActiveHabitTrackerCards =  async () => {
  const { data: trackers } = await getActiveTrackers();

  return (
    <div className="w-full">
      <h1 className="text-base font-semibold text-muted-foreground capitalize">
        Your Today's Habit Trackers
      </h1>
      <div className="flex justify-between overflow-x-hidden w-full">
        <div className="w-full flex gap-2 overflow-x-auto scroll-smooth py-2">
          {trackers.length > 0 ? trackers?.map(tracker => (
            <HabitTrackerCard
              key={tracker.id}
              trackerId={tracker.id}
              habit_name={tracker.habit.name}
              category={reduceCategory[tracker.habit.category].name}
              logged_date={tracker.logged_at}
              totalCount={tracker.length}
              habitId={tracker.habitId}

            />
          )) :
            <div className='border w-full h-32 flex items-center bg-white rounded-lg shadow border-t-4 border-t-teal-700 justify-center'>
              <p className='text-muted-foreground font-medium capitalize text-lg'>No Active Habit trackers for today!</p>
            </div>
          }
        </div>
      </div>
    </div>

  )
}

export default ActiveHabitTrackerCards



