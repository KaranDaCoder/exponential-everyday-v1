'use client';

import { useMemo } from 'react';
import { ClockIcon, SmileIcon, Timer, TrendingUpIcon } from 'lucide-react';

const ProgressOverviewCards = ({ data }) => {
  // Calculate filtered and categorized habits dynamically
  const { activeHabits, upcomingHabits, totalHabits, habitStatuses, activeTrackers, totalTrackers } = useMemo(() => {
    const activeHabits = data.filter((habit) => habit.status === 'ACTIVE');
    const upcomingHabits = data.filter((habit) => habit.status === 'UPCOMING');
    const activeTrackers = data.flatMap((habit) => habit.trackers || []).filter((tracker) => tracker.status === 'ACTIVE');
    const totalTrackers = data.flatMap((habit) => habit.trackers || []).length;
    return {
      activeHabits,
      upcomingHabits,
      totalHabits: data.length,
      activeTrackers,
      totalTrackers,
      habitStatuses: {
        ACTIVE: activeHabits.length,
        UPCOMING: upcomingHabits.length,
      },
    };
  }, [data]);

  return (
    <div className="h-auto">
      <h1 className="text-base font-semibold text-muted-foreground capitalize mb-2">Your Progress Overview</h1>

      <div className="h-auto grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3">
        <Card
          icon={<TrendingUpIcon size={30} strokeWidth={1.2} />}
          title="getting better"
          count={365 - totalHabits} // Example calculation for "getting better"
          total={365}
          label="days since you started"
          borderColor="border-t-fuchsia-700"
        />
        <Card
          icon={<ClockIcon size={30} strokeWidth={1.2} />}
          title="active habit trackers"
          count={activeTrackers.length}
          total={totalTrackers}
          label="total habit trackers"
          borderColor="border-t-pink-600"
        />
        <Card
          icon={<SmileIcon size={30} strokeWidth={1.2} />}
          title="active habits"
          count={habitStatuses.ACTIVE}
          total={totalHabits}
          label="total habits"
          borderColor="border-t-orange-600"
        />
        <Card
          icon={<Timer size={30} strokeWidth={1.2} />}
          title="upcoming habits"
          count={habitStatuses.UPCOMING}
          total={totalHabits}
          label="total habits"
          borderColor="border-t-stone-600"
        />
      </div>
    </div>
  );
};

export default ProgressOverviewCards;

const Card = ({ icon, title, count, total, label, borderColor }) => {
  return (
    <div className={`w-full border-t-4 ${borderColor} shadow rounded-xl flex flex-col py-2 bg-white overflow-visible`}>
      <div className="flex items-center justify-center gap-2">
        {icon}
        <h2 className="capitalize text-base font-semibold">{title}</h2>
      </div>
      <div className="flex flex-col gap-1 justify-center items-center">
        <h1 className="text-4xl font-extrabold text-stone-700">{count}</h1>
        <h2 className="text-muted-foreground font-semibold capitalize">
          {total} {label}
        </h2>
      </div>
    </div>
  );
};
