"use server"

import { getServerSession } from "next-auth"
import authOptions from "./authOptions"

export async function getCurrentUser(){
    const session= await getServerSession(authOptions)
    console.log(session?.user)
    return session?.user
}