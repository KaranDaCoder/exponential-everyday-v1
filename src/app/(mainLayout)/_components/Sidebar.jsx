import Link from 'next/link'
import React from 'react'
import NavLinks from './NavLinks'
import { SignOutButton, UserButton } from '@clerk/nextjs'
import {  LogOutIcon, SettingsIcon } from 'lucide-react'

const Sidebar = async () => {
 return (
  <nav className='overflow-y-auto sticky top-1 h-[calc(100vh-10px)] bg-stone-200/80 rounded-md hidden md:block'>
   {/* Logo */}
   <Link href={'/'} className=''>
    <div className="shadow flex flex-col w-full px-2 py-4">
     <h1 className='text-slate-700 tracking-wide text-2xl font-extrabold text-muted-foreground'>Exponential</h1>
     <h1 className='text-slate-700 tracking-wide text-2xl font-extrabold text-muted-foreground'>Everyday.</h1>
    </div>
   </Link>

  <NavLinks/>
   <div className="py-8 px-4 flex flex-col space-y-4 border-b">
    <Link href={'/profile'} className="flex items-center gap-4 px-2 py-3 rounded-lg transition-all hover:bg-stone-300 group">
     <SettingsIcon/>
     <p className='font-semibold text-stone-700 hover:text-stone-900 transition-colors'>Karan</p>
    </Link>
    <div className="flex items-center gap-4 px-2 py-3 rounded-lg transition-all hover:bg-stone-300">
      <LogOutIcon/>
      <SignOutButton/>
    </div>
  </div>
  </nav>
 )
}

export default Sidebar