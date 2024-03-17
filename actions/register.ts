"use server"
import db from "@/prisma/db";
import { StudentProps } from "@/types/types";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";
import { Resend } from 'resend';
import  { SlackConfirmEmail } from "@/components/ReactEmail";
import { toast } from "@/components/ui/use-toast";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function saveData(data: StudentProps) {
    try {
        const { name, email, password , image } = data;

        const hashedPassword = await hash(password, 10);

        const existingStudent = await db.student.findFirst({
            where: { email },
        });

        if (existingStudent) {
            throw new Error("User with this email already exists");
        }
        const randomToken = Math.floor(1000 + Math.random() * 9000);
        // Convert the number to a string
        const token = randomToken.toString();
        // console.log(token)


        const rawToken = uuidv4();
        const tokenUrl = base64url.encode(rawToken);
        const verify= await resend.emails.send({
            from: 'Verification Code <info@flakolimited.com>',
            to: [email],
            subject: 'Verification',
            react:SlackConfirmEmail ({token}),
          });

    //    console.log(verify)
    const newStudent = await db.student.create({
        data: {
            name,
            email,
            password:hashedPassword,
            image,
            token:token,
            verifiactionToken :tokenUrl 
        },
    });
    console.log(newStudent)
 
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