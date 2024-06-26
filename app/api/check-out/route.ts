import { getCurrentUser } from '@/lib/authProvider';
import db from '@/prisma/db';
import { NextResponse } from 'next/server';

export async function POST(request: any) {

  // const studentId = "65f2057346d8e8cd79aca032";
  const session = await getCurrentUser()
  const studentId = (session as {id:string}).id
  console.log(studentId )
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const existingCheckoutRecord = await db.attendanceRecord.findFirst({
      where: {
        studentId,
        checkOut: {
          gte: todayStart,
          lte: todayEnd,
        },
        
      },
    });
    if (existingCheckoutRecord) {
      return NextResponse.json({ message: 'Student has already checked out today' });
    }

    const existingCheckInRecord = await db.attendanceRecord.findFirst({
      where: {
        studentId,
        checkIn: {
          gte: todayStart,
          lte: todayEnd,
        },
     
      },
    });
    if (!existingCheckInRecord) {
      return NextResponse.json({ message: 'Student has not checked in today' });
    }

    const updatedRecord = await db.attendanceRecord.update({
      where: { id: existingCheckInRecord.id },
      data: {
        checkOut: new Date() ,
        status: "present",
      },
    });

    return NextResponse.json({ message: 'Check-out was successful', updatedRecord });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Not In Range' });
  }
}
export async function GET(request: any) {

  try {
    const attendance = await db.attendanceRecord.findMany({
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