"use server"

import db from "@/prisma/db";
import { StudentProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function saveData(data:any){
    try {
      const newStudent = await db.student.create({
        data
      }) 
      revalidatePath("/dashboard") 
      // console.log(newStudent)
    } catch (error) {
       console.log(error) 
    }
}
// export async function getProjects(){
//     try {
//       const projects = await prisma.project.findMany()  
//       return projects
//     } catch (error) {
//        console.log(error) 
//     }
// }