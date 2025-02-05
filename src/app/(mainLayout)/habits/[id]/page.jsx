import { deleteHabit, getAHabit } from '@/actions/habits';
import React from 'react'
import ProgressLineChart from '../../overview/_component/ProgressLineChart';
import BreadCrumbs from '../../_components/Breadcrumbs';
import { Label } from '@/components/ui/label';
import { DateTime } from 'luxon';
import DeleteEditBtn from './_components/DeleteEditBtn';

const SingleHabitPage = async ({params}) => {

  const {id} = await params;
  const {data} = await getAHabit(id);
 

  return (
    <main className='flex flex-col gap-4'>
      <BreadCrumbs item1={'Overview'} item2={'Habits'} item3={id}/>
      <h1 className="text-lg font-semibold text-muted-foreground capitalize">
       {data.name}
      </h1>
      <div className="min-h-48 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="w-full lg:col-span-2 col-span-1 h-full shadow rounded-lg py-1 bg-white">
          <h1>Graph</h1>
        </div>
        <div className="w-full h-full shadow rounded-lg py-1 bg-white">
          <h2 className='text-center text-muted-foreground font-semibold text-lg uppercase'>About</h2>
          <div className="flex flex-col w-5/6 border mx-auto">
              <div className="flex gap-3">
                <Label>Start date</Label>
              <Label>{DateTime.fromJSDate(new Date(data.start_date)).toLocaleString(DateTime.DATE_FULL)}</Label>
              </div>
          </div>
        <DeleteEditBtn habitId={id}/>
        </div>
      </div>
      <div className="">
        <h2 className='text-lg font-medium text-muted-foreground'>Habit Trackers</h2>
        <div className="flex flex-col">
            
        </div>
      </div>

    </main>
  )
}

export default SingleHabitPage