'use client'
import { deleteHabit } from '@/actions/habits';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const DeleteEditBtn = ({ habitId }) => {
 console.log(habitId)
 const router = useRouter();
 const handleDelete = async () => {
  try {
   const { success } = await deleteHabit(habitId)
   if (success) {
    toast.success(`Habit deleted successfully`);
    router.back();
   }
  } catch (error) {

  }
 }
  return (
   <div className="flex justify-around items-center">
    <Button variant='outline'>Edit</Button>
    <Button variant='destructive' onClick={handleDelete}>Delete</Button>
   </div>
  )
}

export default DeleteEditBtn