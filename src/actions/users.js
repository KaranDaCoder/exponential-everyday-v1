"use server";

import connectDb from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";

export const validateLoggedInUser =  async() => {
 const {userId} = await auth();
 try {
      const isUserLoggedIn = await connectDb.user.findFirst({
        where : {
          clerkUserId : userId
        }
      })

      if(!isUserLoggedIn) {
       return {
        success : false,
        data: {},
        message : 'User not logged in/authenticated'
       }
      }
      return {
       success : true,
       userId : isUserLoggedIn.id,
       message: 'user is authenticated'
      }
 } catch (error) {
  throw Error(`User Session not validated, ${error.message}`)
 }
}