import { BellIcon, ChartLineIcon, CircleHelpIcon, ClockIcon, LayoutPanelTopIcon, SmileIcon } from "lucide-react";

export const  links = [
 {
  href: '/overview',
  label: 'Overview',
  icon: (
   <LayoutPanelTopIcon
    size={24}
    className='text-stone-800 group-hover:text-slate-800 transition-colors'
   />
  ),
 },
 {
  href: '/habits',
  label: 'My Habits',
  icon: (
   <SmileIcon
    size={24}
    className='text-stone-800 group-hover:text-slate-800 transition-colors'
   />
  ),
 },
 {
  href: '/my-habit-trackers',
  label: 'Habit Trackers',
  icon: (
   <ClockIcon
    size={24}
    className='text-stone-800 group-hover:text-slate-800 transition-colors'
   />
  ),
 },
 {
  href: '/analytics',
  label: 'Analytics',
  icon: (
   <ChartLineIcon
    size={24}
    className='text-stone-800 group-hover:text-slate-800 transition-colors'
   />
  ),
 },
 {
  href: '/activity',
  label: 'Activity',
  icon: (
   <BellIcon
    size={24}
    className='text-stone-800 group-hover:text-slate-800 transition-colors'
   />
  ),
 },
 {
  href: '/help',
  label: 'Help',
  icon: (
   <CircleHelpIcon
    size={24}
    className='text-stone-800 group-hover:text-slate-800 transition-colors'
   />
  ),
 },
];