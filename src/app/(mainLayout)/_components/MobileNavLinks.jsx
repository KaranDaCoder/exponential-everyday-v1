'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOutIcon, MenuSquareIcon, SettingsIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HabitDrawer from '@/components/HabitDrawer';
import { SignOutButton } from '@clerk/nextjs';
import { links } from '@/static_data/navLinks';


const MobileNavDrawer = () => {
 const [isOpen, setIsOpen] = useState(false);
 const pathName = usePathname();

 const toggleDrawer = () => setIsOpen(!isOpen);

 return (
  <div>
   {/* Menu Button */}
   <Button
    variant="default"
    className="fixed top-2 right-4 z-50 px-4 py-2  border-none bg-orange-600 text-white md:hidden flex items-center"
    onClick={toggleDrawer}
   >
    <MenuSquareIcon size={32} />
    <p>Menu</p>
   </Button>

   {/* Drawer Overlay */}
   {isOpen && (
    <div
     className="fixed inset-0 z-40 bg-black bg-opacity-80 transition-opacity duration-300"
     onClick={toggleDrawer}
    ></div>
   )}

   {/* Drawer */}
   <div
    className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
     } transition-transform duration-300`}
   >
    <div className="flex items-center justify-between p-4 border-b">
     <div className="flex flex-col w-full px-2 py-4">
      <h1 className='text-slate-700 tracking-wide text-2xl font-extrabold text-muted-foreground'>Exponential</h1>
      <h1 className='text-slate-700 tracking-wide text-2xl font-extrabold text-muted-foreground'>Everyday.</h1>
     </div>
     <button
      className="p-2 rounded-md text-stone-800 hover:bg-stone-200"
      onClick={toggleDrawer}
     >
      <XIcon size={24} />
     </button>
    </div>
    <div className="flex flex-col space-y-3 p-4">
     <HabitDrawer/>
     {links.map((link, index) => (
      <Link
       key={index}
       href={link.href}
       className={`flex items-center gap-4 px-2 py-3 rounded-lg transition-all hover:bg-stone-300 ${pathName === link.href.toLowerCase() ? 'bg-stone-300' : ''
        }`}
       onClick={toggleDrawer}
      >
       {link.icon}
       <p className="font-medium text-stone-700">{link.label}</p>
      </Link>
     ))}
    </div>
    <div className="py-8 px-4 flex flex-col space-y-4 border-b">
     <Link href={'/dashboard'} className="flex items-center gap-4 px-2 py-3 rounded-lg transition-all hover:bg-stone-300 group">
      <SettingsIcon />
      <p className='font-semibold text-stone-700 hover:text-stone-900 transition-colors'>Karan</p>
     </Link>
     <div className="flex items-center gap-4 px-2 py-3 rounded-lg transition-all hover:bg-stone-300">
      <LogOutIcon />
      <SignOutButton />
     </div>
    </div>
   </div>
  </div>
 );
};

export default MobileNavDrawer;
