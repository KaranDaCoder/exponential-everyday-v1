import React from 'react'
import Sidebar from './_components/Sidebar'
import MobileNavLinks from './_components/MobileNavLinks'


const MainAppLayout = async ({ children }) => {

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
