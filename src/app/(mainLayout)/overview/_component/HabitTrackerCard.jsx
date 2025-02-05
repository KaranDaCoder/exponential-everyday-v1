'use client';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateSingleTracker } from '@/actions/habitTrackers';
import { buttonVariants } from '@/components/ui/button';


const HabitTrackerCard = ({ habit_name, category, logged_date, habitId, trackerId }) => {
  const router = useRouter();
  const [switchState, setSwitchState] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [trackerNotes, setTrackerNotes] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render only after mounting
  if (!isMounted) {
    return null;
  }

  const handleToggle = async (checked) => {
    setSwitchState(checked);
    const { success } = await updateSingleTracker(trackerId, trackerNotes);

    if (success) {
      setIsExiting(true); // Start the exit animation
      router.refresh();
      toast.success('habit tracker updated.');
      setTimeout(() => setIsVisible(false), 500); // Match the duration of the animation
    }
  };

  return (
    isVisible && (
      <div
        className={`px-2 py-1 min-w-96 shadow border border-t-4 border-t-stone-600 rounded-xl bg-white flex-none transition-all duration-500 ${isExiting
          ? 'opacity-0 transform scale-95 blur-sm'
          : 'opacity-100 transform scale-100'
          }`}
      >
        <div className='flex flex-col justify-between py-1'>
          <div className='flex items-center justify-between'>
            <h1 className='capitalize font-semibold'>{habit_name}</h1>
            <div className="">
              <Switch checked={switchState} onCheckedChange={handleToggle} />
              {/* <p className='text-xs text-muted-foreground font-semibold'>completed</p> */}
            </div>
          </div>
        </div>
        <div className='flex flex-col space-y-1'>
            <Textarea
            className='text-base placeholder:text-sm'
            placeholder='Describe how you did before updating the habit tracker...'
            value={trackerNotes}
            onChange={(e) => setTrackerNotes(e.target.value)}
          />
          <Link
            href={`/habits/${habitId}`}
            className={`self-end hover:text-muted-foreground text-sm`}
          >
            View Habit
          </Link>
        </div>
      </div>
    )
  );
};

export default HabitTrackerCard;
