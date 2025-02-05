import React from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button'
import { PenBoxIcon } from 'lucide-react'
import CreateHabitForm from './CreateHabitForm'

const HabitDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button  className="bg-orange-600 hover:bg-orange-700 hover:text-white text-white capitalize">
          <PenBoxIcon size={28} />
          <span className="md:block">New Habit</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="left-0 top-0 h-5/6 md:w-1/3 w-full">
        <DrawerHeader>
          <DrawerTitle className="text-center uppercase text-muted-foreground">
            Create New Habit
          </DrawerTitle>
          {/* Provide an accessible description here */}
          <DrawerDescription className='text-center font-semibold'>
            Start creating your new habit by filling in the details below.
          </DrawerDescription>
        </DrawerHeader>
        {/* Include the form */}
        <CreateHabitForm />
      </DrawerContent>
    </Drawer>
  )
}

export default HabitDrawer
