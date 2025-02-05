import { auth, currentUser } from '@clerk/nextjs/server'
import { connectDb } from './dbConnect';
import { redirect } from 'next/navigation';
export const registerUser = async () => {
 const curr_user = await currentUser();

 if (!curr_user) {
  return null
 }

 try {
  const { id, firstName, lastName, imageUrl } = curr_user;
  const is_user = await connectDb.User.findUnique({ where: { clerkUserId: id } })
  if (is_user) {
   return { success: true, data: is_user, error: {}, message: 'user already exists' }
  }
  const name = `${firstName} ${lastName}`;

  const create_user = await connectDb.User.create({
   data: {
    clerkUserId: id,
    firstName,
    lastName,
    name,
    imageUrl,
    email: curr_user.emailAddresses[0].emailAddress
   }
  })

  return { success: true, data: create_user, error: {}, message: 'user created successfully' }
 } catch (error) {

  return { success: false, data: {}, error: 'error creating user', message: error.message }
 }
}