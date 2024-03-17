import db from "@/prisma/db";
import { NextResponse } from "next/server";

export async function PATCH(request: any, { params: { id } }: any) {
  try {
    const student = await db.student.update({
      where: {
        id,
      },
      data: {
        emailVerified: true,
      },
    });
    // console.log(student)
    return NextResponse.json(student);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to update student",
      },
      {
        status: 500,
      }
    );
  }
}
