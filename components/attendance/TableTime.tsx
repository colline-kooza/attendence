"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardTitle } from '../ui/card';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table';
import getData from '@/utils/getData';

interface AttendanceRecord {
  id: string;
  studentId: string;
  checkIn: string;
  checkOut: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
}

export default function TableTime() {

  
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const fetchedAttendance: AttendanceRecord[] = await getData("/check-in");
        setAttendance(fetchedAttendance);
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
      }
    }

    fetchAttendance();
  }, []);

  const calculateTotalTime = () => {
    let overallTotalTime = 0;
    return attendance.map(record => {
      let checkIn = "";
      let checkOut = "";
      let totalTime = "";

      if (record.checkIn && record.status !== "absent") {
        checkIn = new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      }
      if (record.checkOut && record.status !== "absent") {
        checkOut = new Date(record.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      }
      if (record.checkIn && record.checkOut && record.status !== "absent") {
        const totalTimeInMilliseconds = new Date(record.checkOut).getTime() - new Date(record.checkIn).getTime();
        totalTime = new Date(totalTimeInMilliseconds).toISOString().substr(11, 8);
        overallTotalTime += totalTimeInMilliseconds;
      }
     
      // Include status in the returned object
      const status = record.status === "absent" ? "Absent" : "present";
      
      return {
        date: new Date(record.checkIn).toLocaleDateString(),
        checkIn,
        checkOut,
        totalTime,
        status
      };
    });
  };

  const attendanceRecords = calculateTotalTime();

  const overallTotalTime = new Date(attendance.reduce((acc, curr) => acc + (new Date(curr.checkOut).getTime() - new Date(curr.checkIn).getTime()), 0)).toISOString().substr(11, 8);
  
  return (
    <div>
      <Card>
        <CardTitle className='flex items-center justify-center mt-3 mb-5 text-xl font-bold'>My Attendance</CardTitle>
        <Table >
          <TableCaption>A list of your recent attendance records.</TableCaption>
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
            {attendanceRecords.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.checkIn}</TableCell>
                <TableCell>{record.checkOut}</TableCell>
                <TableCell>{record.status}</TableCell> 
                <TableCell className="text-right">{record.totalTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Overall Total</TableCell>
              <TableCell className="text-right">{overallTotalTime}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </div>
  );
}
