"use server"
import db from "@/prisma/db";
import { StudentProps } from "@/types/types";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";

export async function saveData(data: StudentProps) {
    try {
        const { name, email, password } = data;

        const hashedPassword = await hash(password, 10);

        const existingStudent = await db.student.findFirst({
            where: { email },
        });

        if (existingStudent) {
            throw new Error("User with this email already exists");
        }

        const newStudent = await db.student.create({
            data: {
                name,
                email,
                password:hashedPassword,
            },
        });
  // console.log(newStudent)
        revalidatePath("/dashboard");
        return newStudent; 
    } catch (error) {
        console.error("Error saving data:", error);
        throw new Error("Failed to save data");
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