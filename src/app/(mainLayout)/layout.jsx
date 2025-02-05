import React from 'react'
import Sidebar from './_components/Sidebar'
import BreadCrumbs from './_components/Breadcrumbs'
import MobileNavLinks from './_components/MobileNavLinks'
import { registerUser } from '@/lib/registerUser'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'


const MainAppLayout = async ({ children }) => {
 const session = await auth()
 if(!session) {
  redirect('/')
 }
 return (
  <main className="flex">
   {/* Sidebar - only visible on larger screens */}
   <div className="hidden md:block md:w-[220px]">
    <Sidebar />
   </div>
   {/* Main content - always full width on mobile */}
   <div className="flex-1 bg-stone-200/50 rounded-md p-4 overflow-x-hidden h-screen">
 
    {children}
   </div>
   <MobileNavLinks/>
  </main>
 )
}

export default MainAppLayout
