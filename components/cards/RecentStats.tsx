"use client"

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface StudentData {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface CheckInOutRecord {
  id: string;
  studentId: string;
  checkIn: string;
  checkOut: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function RecentSales({ studentsData, attendance }: any) {
  const [studentAverageTime, setStudentAverageTime] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const calculateAverageTime = () => {
      const totalTime: { [key: string]: number } = {};
      const count: { [key: string]: number } = {};

      attendance.forEach((record: CheckInOutRecord) => {
        if (!totalTime[record.studentId]) {
          totalTime[record.studentId] = 0;
          count[record.studentId] = 0;
        }

        if (record.checkOut) {
          const checkInTime = new Date(record.checkIn).getTime();
          const checkOutTime = new Date(record.checkOut).getTime();
          const timeDifference = checkOutTime - checkInTime;

          totalTime[record.studentId] += timeDifference;
          count[record.studentId]++;
        }
      });

      const averageTime: { [key: string]: string } = {};
      Object.keys(totalTime).forEach((studentId) => {
        if (count[studentId] > 0) {
          const averageMilliseconds = totalTime[studentId] / count[studentId];
          const hours = Math.floor(averageMilliseconds / (1000 * 60 * 60));
          const minutes = Math.floor((averageMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
          averageTime[studentId] = `${hours}:${minutes}`;
        }
      });

      setStudentAverageTime(averageTime);
    };

    calculateAverageTime();
  }, [attendance]);

  return (
    <div className="space-y-8">
      {studentsData?.map((student: StudentData) => (
        <div key={student.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage className='object-cover' src={student.image} />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{student.name}</p>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
          <div className="ml-auto font-medium text-sm">
            {studentAverageTime[student.id] ? studentAverageTime[student.id] : '0'}
          </div>
        </div>
      ))}
    </div>
  );
}
