import db from '@/prisma/db';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  const studentId = "65f2057346d8e8cd79aca032";

  try {
    const checkInTime = new Date();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const tomorrowStart = new Date();
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0);

    const yesterdayStart = new Date();
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);

    const yesterdayEnd = new Date();
    yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
    yesterdayEnd.setHours(23, 59, 59, 999);

    // Check if user checked in yesterday
    const previousDayRecord = await db.attendanceRecord.findFirst({
      where: {
        studentId,
        checkIn: {
          gte: yesterdayStart,
          lt: todayStart,
        },
      },
    });

    // If user didn't check in yesterday, mark as absent
    if (!previousDayRecord) {
      await db.attendanceRecord.create({
        data: {
          student: { connect: { id: studentId } },
          checkIn: yesterdayStart,
          checkOut: yesterdayEnd,
          status: "absent",
        },
      });
    }

    // Proceed with check-in for today
    const existingRecord = await db.attendanceRecord.findFirst({
      where: {
        studentId,
        checkIn: {
          gte: todayStart,
          lt: tomorrowStart,
        },
      },
    });

    if (existingRecord) {
      return NextResponse.json({ message: 'Already checked in today' });
    } else {
      const newRecord = await db.attendanceRecord.create({
        data: {
          student: { connect: { id: studentId } },
          checkIn: checkInTime,
        },
      });

      console.log(newRecord);
      return NextResponse.json({
        newRecord
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}

export async function GET(request: any) {
  const userId = "65f2057346d8e8cd79aca032"; 

  try {
    const attendance = await db.attendanceRecord.findMany({
      where: {
        studentId: userId, 
      },
      orderBy: {
        createdAt: "desc", 
      },
    });
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
