import { getUserHabits } from '@/actions/habits';
import HabitsList from './_components/HabitsList';
import CategoriesBarChart from '../overview/_component/CategoriesBarChart';
import BreadCrumbs from '../_components/Breadcrumbs';

const HabitsPage = async () => {
  const { data } = await getUserHabits();

  return (
    <main className='flex flex-col gap-4'>
      <BreadCrumbs item1='Overview' item2={'Habits'} />
      <h1 className='text-base font-semibold text-muted-foreground capitalize'>
        My Habits
      </h1>
      {/* <div className='col-span-1 h-full'>
        <CategoriesBarChart type={'category'} />
      </div> */}
      <HabitsList allHabits={data} />
    </main>
  );
};

export default HabitsPage;
