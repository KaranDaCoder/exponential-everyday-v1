'use client';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { categories, reduceCategory, reduceStatuses, reduceStrengths } from '@/static_data/categories';
import classNames from 'classnames';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRightIcon, ChevronUp, Cross, MoreHorizontalIcon, XIcon } from 'lucide-react';

const HabitsList = ({ allHabits }) => {
 const [drawer, setDrawer] = useState(true);
 const [searchHabit, setSearchHabit] = useState('');
 const [typeFilter, setTypeFilter] = useState('');
 const [strengthFilter, setStrengthFilter] = useState('');

 const filteredAndSortedHabits = useMemo(() => {
  let result = [...allHabits];

  if (searchHabit) {
   const searchLower = searchHabit.toLowerCase();
   result = result.filter((habit) => (habit.name?.toLowerCase().includes(searchLower) || habit.description?.toLowerCase().includes(searchHabit)));
  }

  if (typeFilter) {
   result = result.filter((habit) => habit.category === typeFilter);
  }

  if (strengthFilter) {
   result = result.filter((habit) => habit.current_strength === strengthFilter);
  }

  return result;
 }, [allHabits, searchHabit, typeFilter, strengthFilter]);

 const handleClearFilters = () => {
  setSearchHabit('');
  setTypeFilter('');
  setStrengthFilter('');
 };

 return (
  <main className='flex flex-col gap-3'>
   <div className="h-auto flex space-y-1 flex-col bg-white p-2 rounded-lg shadow">
    <div className="flex justify-between items-center">
     <h1 className='font-medium text-sm'>Search and Filters</h1>
     {drawer ? <ChevronUp className='cursor-pointer' onClick={() => setDrawer(false)} /> : <ChevronDown className='cursor-pointer' onClick={() => setDrawer(true)} />}
    </div>
    {drawer && <div className="flex flex-col md:flex-row md:justify-start items-start gap-4">

     <Input
      placeholder="Search a habit"
      className="bg-white md:w-1/2 w-full"
      value={searchHabit}
      onChange={(e) => setSearchHabit(e.target.value)}
     />


     <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value)}>
      <SelectTrigger className="lg:w-[240px] w-full bg-white">
       <SelectValue placeholder="Habit Category" />
      </SelectTrigger>
      <SelectContent>
       <SelectGroup>
        {categories.map((cat) => (
         <SelectItem value={cat.key} key={cat.key}>
          <span className="gap-2 capitalize inline-flex items-center">
           {cat.icon} {cat.name}
          </span>
         </SelectItem>
        ))}
       </SelectGroup>
      </SelectContent>
     </Select>

     <Select value={strengthFilter} onValueChange={(value) => setStrengthFilter(value)}>
      <SelectTrigger className="lg:w-[240px] w-full bg-white">
       <SelectValue placeholder="Habit Strength" />
      </SelectTrigger>
      <SelectContent>
       {Object.keys(reduceStrengths).map((key) => (
        <SelectItem value={key} key={key} className='capitalize'>
         {reduceStrengths[key].name}
        </SelectItem>
       ))}
      </SelectContent>
     </Select>

     {(searchHabit || typeFilter || strengthFilter ) && <Button variant='outline' className='px-4' onClick={handleClearFilters}>Clear</Button>}
    </div>}


   </div>
   <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4 h-auto">
    {filteredAndSortedHabits.length > 0 ? (
     filteredAndSortedHabits.map((habit) => (
      <HabitCard
       key={habit.id}
       name={habit.name}
       status={reduceStatuses[habit.status].name}
       start_date={habit.start_date ? formatInTimeZone(new Date(habit.start_date), 'UTC', 'MMMM dd, yyyy') : 'No Date'}
       category={reduceCategory[habit.category]?.icon || 'Not available'}
       bgColor={reduceCategory[habit.category]?.bgColor || 'bg-stone-300'}
       current_strength={reduceStrengths[habit.current_strength].name}
       habit_id={habit.id}
      />
     ))
    ) : (
     <p className="text-center text-gray-500">No habits found.</p>
    )}
   </div>
  </main>
 );
};

// export default HabitsList;

export default HabitsList;

const HabitCard = ({ habit_id, name, status, start_date, category, bgColor, current_strength }) => {

 const badgeClass = classNames('capitalize text-stone-100 w-fit', bgColor);
 const cardClass = classNames('w-full py-1 px-2 flex flex-col justify-around relative rounded-xl border-l-4 shadow border-l-teal-800');
 return (
  <Link href={`/habits/${habit_id}`} className={`${cardClass} hover:scale-105 transition-all duration-300 bg-white`}>
   <div className="flex flex-col space-y-1">
    <div className="flex justify-between items-center">
    <p className="font-light tracking-wide text-base uppercase">{name}</p>
     <Badge variant={'ghost'} className={'border-none'} >{category}</Badge>
    </div>
    <div className="flex justify-between items-center">
     <p className={`text-sm font-semibold caption-top ${status === 'Active' ? 'text-green-800' : 'text-stone-700'}`}>{status}</p>
     <p className="text-xs font-semibold">{start_date}</p>
    </div>
    <div className="flex justify-between items-center py-2">
     {/* Badge dynamically receives bgColor */}
     <Badge className="w-fit bg-stone-600 capitalize">{current_strength}</Badge>
     {/* <Badge>12 trackers</Badge> */}
    </div>
   </div>
  </Link>
 );
};
