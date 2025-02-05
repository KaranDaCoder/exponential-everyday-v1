import { DateTime } from 'luxon';
import {  BeatLoader } from "react-spinners";
import {
  bulkUpdateHabits,
  getUserHabits,
} from '@/actions/habits';
import { Badge } from '@/components/ui/badge';
import React, { Suspense } from 'react';
import ProgressOverviewCards from './_component/ProgressOverviewCards';
import ActiveHabitTrackerCards from './_component/ActiveHabitTrackerCards';
import CategoriesBarChart from './_component/CategoriesBarChart';
import {  bulkUpdateTrackers, createTrackers} from '@/actions/habitTrackers';
import { registerUser } from '@/lib/registerUser';
import BreadCrumbs from '../_components/Breadcrumbs';



const OverviewPage = async () => {
  const [createTrackerResult, updateHabitsResult, updateTrackersResult] = await Promise.all([
    //bulkUpdateHabits(),  
    //bulkUpdateTrackers(),
    // createTrackers(),
  ]);

  const {data} = await getUserHabits();
  const user = await registerUser();

  return (
    <main className='flex flex-col gap-4'>
         <BreadCrumbs item1='Overview'/>
      <div className='flex flex-col w-full mb-3'>
        <div className='flex justify-between items-start'>
          <h1 className='font-semibold text-2xl'>Hi, {user.data.firstName}.</h1>
          <Badge
            className='font-semibold text-sm bg-slate-800 text-white'
            variant={'outline'}
          >
            {DateTime.now().toFormat('MMMM dd, yyyy')}
          </Badge>
        </div>
      </div>

      {/* Progress overview cards */}
      <Suspense fallback={<BeatLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <ProgressOverviewCards data={data}/>
      </Suspense>

      {/* Active Habit Trackers Cards */}
      <Suspense fallback={<BeatLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <ActiveHabitTrackerCards data={data} />
      </Suspense>

      {/* CHARTS */}
      <div className='h-auto rounded-lg'>
        <h1 className="text-base font-semibold text-muted-foreground capitalize mb-2">
          Your Habits
        </h1>
        <div className='h-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2'>
              <CategoriesBarChart type={'strength'}  />    
        </div>
      </div>
    </main>
  );
};

export default OverviewPage;
