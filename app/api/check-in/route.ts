import db from '@/prisma/db';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  const { studentId } = await request.json();
   console.log(studentId)
   
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Set to today's start time

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // Set to today's end time

    const existingRecord = await db.attendanceRecord.findFirst({
      where: {
        student:studentId,
        checkIn: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    console.log(existingRecord);

    if (existingRecord) {
      return NextResponse.json({ message: 'Student already checked in today' });
    } else {
      // Create a new attendance record without specifying additional conditions for checkIn
      const newRecord = await db.attendanceRecord.create({
        data: {
          studentId: studentId,
          checkIn: todayStart, // Set checkIn directly to today's start time
        },
      });

      console.log(newRecord);
      return NextResponse.json(newRecord);
    }
  } catch (error) {
    console.error(error);
  }
}
