import { PrismaClient } from "@prisma/client";

export const connectDb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') {
 globalThis.prisma = connectDb;
}

export default connectDb;