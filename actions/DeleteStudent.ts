"use server"
import db from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function deletedStudent(id: string) {
    try {
      const deletedStudent= await db.student.delete({
        where: { id: id },
      });
      revalidatePath("/dashboard");
      console.log(deletedStudent)
      return deletedStudent;
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  }