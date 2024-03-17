import db from '@/prisma/db';
import { NextResponse } from 'next/server';


export async function GET(request: any) {

    try {
      const attendance = await db.student.findMany();
      return NextResponse.json(attendance);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          error,
          message: "Failed to fetch attendances",
        },
        {
          status: 500,
        }
      );
    }
  }