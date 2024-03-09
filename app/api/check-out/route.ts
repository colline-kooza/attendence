import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/prisma/db';
import { NextResponse } from 'next/server';


export async function POST(request: any) {
  const { studentId } =request.body;

  if (!studentId) {
    return NextResponse.json("")
  }

  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Set to today's start time

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // Set to today's end time

    const recordToUpdate = await db.attendanceRecord.findFirst({
      where: {
        studentId,
        checkIn: {
          gte: todayStart,
          lte: todayEnd,
        },
        checkOut: null,
      },
    });

    if (!recordToUpdate) {
      return NextResponse.json({ message: 'Student has not checked in today' });
    }

    const updatedRecord = await db.attendanceRecord.update({
      where: { id: recordToUpdate.id },
      data: { checkOut: new Date() },
    });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
