import db from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request:any, { params: { id } }:any) {
  try {
    const student = await db.student.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(student);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "failed to fetch student",
      },
      {
        status: 500,
      }
    );
  }
}
