'use client';
import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { DrawerClose, DrawerFooter } from './ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { createNewHabit } from '@/actions/habits';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { categories } from '@/static_data/categories';
import { useRouter } from 'next/navigation';

const CreateHabitForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      category: 'OTHER',
      name: '',
      description: '',
      start_difficulty: 5,
      start_date: new Date(),
      set_reminder: false, // Default value for start_date
    },
  });

  // Watch the form's `start_date` field for the selected date
  const selectedDate = watch('start_date');

  const onSubmit = async (data) => {
    const { success, error, message } = await createNewHabit(data);
    if (success) {
      toast.success(message);
      reset();
      router.refresh();
    } else {
      toast.error(error);
    }
  };

  return (
    <div className='w-5/6 flex justify-between flex-col mx-auto h-full'>
      <form
        className='flex flex-col justify-between h-full'
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* category */}
        <div className='flex flex-col gap-2'>
          <Label
            htmlFor='category'
            className='uppercase text-muted-foreground font-semibold'
          >
            Category
          </Label>
          <Select
            value={watch('category') || 'Other'} // Ensure the default value is used
            onValueChange={(value) => setValue('category', value)} // Update the form value
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a habit category'></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((cat) => (
                  <SelectItem value={cat.key} key={cat.key}>
                    <span
                      className={`gap-2 capitalize inline-flex items-center`}
                    >
                      {cat.icon} {cat.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Name */}
        <div className='flex flex-col gap-2'>
          <Label className='uppercase text-muted-foreground font-semibold'>
            Habit Name
          </Label>
          <Input
            placeholder='e.g.: Go to the gym'
            {...register('name', { required: 'Habit Name is required' })}
          />
          {errors.name && (
            <p className='text-red-500 text-sm'>{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className='flex flex-col gap-2'>
          <Label className='uppercase text-muted-foreground font-semibold'>
            Habit Description
          </Label>
          <Textarea {...register('description')} />
        </div>

        {/* Strength */}
        <div className='flex flex-col gap-2'>
          <Label className='uppercase text-muted-foreground font-semibold'>
            Habit Difficulty
          </Label>
          <Slider
            min={1}
            max={10}
            defaultValue={[5]}
            step={1}
            onValueChange={(val) => setValue('start_difficulty', val[0])}
            className='w-full cursor-pointer'
            {...register('start_difficulty', { valueAsNumber: true })}
          />
          <div className='flex justify-between'>
            <p className='text-sm font-semibold text-muted-foreground'>Difficult</p>
            <p className='text-sm font-semibold text-muted-foreground'>
              Medium
            </p>
            <p className='text-sm font-semibold text-muted-foreground'>
              Easy
            </p>
          </div>
        </div>

        {/* START DATE */}
        <div className='flex flex-col gap-2'>
          <Label className='uppercase text-muted-foreground font-semibold'>
            Start Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='w-full justify-start text-left'
              >
                {selectedDate
                  ? format(new Date(selectedDate), 'MMM d, yyyy')
                  : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={selectedDate ? new Date(selectedDate) : undefined}
                onSelect={(date) => {
                  if (date) {
                    const isoDate = date.toISOString();
                    setValue('start_date', isoDate, { shouldValidate: true }); // Update form state
                  }
                }}
                disabled={(day) => day < new Date().setHours(0, 0, 0, 0)} // Disable past dates
              />
            </PopoverContent>
          </Popover>
          {errors.start_date && (
            <p className='text-red-500 text-sm'>{errors.start_date.message}</p>
          )}
        </div>

        {/* Set Reminder */}
        <div className='flex justify-between items-center'>
          <Label>Do you want to set a reminder?</Label>
          <Switch
            className=''
            onCheckedChange={(checked) => setValue('set_reminder', checked)}
          />
        </div>
        <DrawerFooter className='mt-4'>
          <Button type='submit' className='bg-orange-600 hover:bg-orange-700 transition-colors' disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Habit'}
          </Button>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default CreateHabitForm;
