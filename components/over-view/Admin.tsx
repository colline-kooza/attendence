"use client"
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon, Trash2 } from "lucide-react";
import getData from '@/utils/getData';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table';
import DeleteStudent from '../DeleteStudent';

type Student = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
};

type AttendanceRecord = {
  id: string;
  studentId: string;
  checkIn: string;
  checkOut: string;
  status: string;
};

export default function Admin() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await getData("/students");
        setStudents(studentsResponse);
        const attendanceResponse = await getData("/check-in");
        setAttendance(attendanceResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const findAttendanceForStudent = (studentId: string) => {
    return attendance.filter(record => record.studentId === studentId);
  };
  const calculateOverallTotalTime = (attendanceRecords: AttendanceRecord[]) => {
    let totalMinutes = 0;
  
    attendanceRecords.forEach(record => {
      const checkInTime = new Date(record.checkIn).getTime();
      const checkOutTime = record.checkOut ? new Date(record.checkOut).getTime() : new Date().getTime();
      const timeDifference = checkOutTime - checkInTime;
      totalMinutes += timeDifference / (1000 * 60);
    });
  
    return totalMinutes;
  };
  const calculateTotalTime = (checkIn: string, checkOut: string | null) => {
    if (!checkOut) return 'Not checked out';
  
    const checkInTime = new Date(checkIn).getTime();
    const checkOutTime = new Date(checkOut).getTime();
    const timeDifference = checkOutTime - checkInTime;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${hours} hours ${minutes} minutes`;
  };
  
  return (
    <>
      {students.map(student => (
        <Card key={student.id} className='lg:p-8 lg:w-[90%] mt-8 lg:ml-8'>
         <div className='flex justify-between'>
         <CardHeader>
            <CardTitle>{student.name}</CardTitle>
            <CardDescription>{student.email}</CardDescription>
          </CardHeader>
         <CardHeader>
            <CardTitle>
           <DeleteStudent id={student.id}/>
            </CardTitle>
          </CardHeader>
         </div>
          <CardContent className="grid gap-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={student.image} alt={student.name} />
                <AvatarFallback>{student.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{student.name}</p>
                <p className="text-sm text-muted-foreground">{student.email}</p>
              </div>
            </div>
            <div>
              <p className='font-semibold'>Role: {student.role}</p>
            </div>
  <Table>
  <TableCaption>A list of all students records.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Date</TableHead>
      <TableHead>Arrival</TableHead>
      <TableHead>Departure</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {findAttendanceForStudent(student.id).map(record => (
      <TableRow key={record.id}>
        <TableCell className='whitespace-nowrap'>{new Date(record.checkIn).toLocaleDateString()}</TableCell>
        <TableCell className='whitespace-nowrap'>{new Date(record.checkIn).toLocaleTimeString()}</TableCell>
        <TableCell className='whitespace-nowrap'>{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : 'Not checked out'}</TableCell>
        <TableCell>{record.status || 'Pending'}</TableCell>

        <TableCell className="text-right whitespace-nowrap">{calculateTotalTime(record.checkIn, record.checkOut)}</TableCell>

      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={4}>Overall Total</TableCell>
      <TableCell className="text-right">{calculateOverallTotalTime(findAttendanceForStudent(student.id))}</TableCell>
    </TableRow>
  </TableFooter>
</Table>

          </CardContent>
        </Card>
      ))}
    </>
  );
}
