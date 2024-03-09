import React from 'react'
import { Card, CardTitle } from '../ui/card'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table'

export default function TableTime() {
    const attendanceRecords = [
        { date: "2024-03-08", checkIn: "08:00", checkOut: "17:00", totalTime: "09:00" },
        { date: "2024-03-07", checkIn: "08:15", checkOut: "16:45", totalTime: "08:30" },
        { date: "2024-03-06", checkIn: "08:30", checkOut: "17:15", totalTime: "08:45" },
        { date: "2024-03-05", checkIn: "09:00", checkOut: "18:00", totalTime: "09:00" },
        { date: "2024-03-04", checkIn: "08:45", checkOut: "17:30", totalTime: "08:45" },
      ];
      
  return (
    <div>
     <Card>
     <CardTitle className='flex items-center justify-center mt-3 mb-5 text-xl font-bold'>My Attendence</CardTitle>
     <Table>
  <TableCaption>A list of your recent attendance records.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Date</TableHead>
      <TableHead>Check In</TableHead>
      <TableHead>Check Out</TableHead>
      <TableHead className="text-right">Total Time</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {attendanceRecords.map((record) => (
      <TableRow key={record.date}>
        <TableCell>{record.date}</TableCell>
        <TableCell>{record.checkIn}</TableCell>
        <TableCell>{record.checkOut}</TableCell>
        <TableCell className="text-right">{record.totalTime}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell className="text-right">23 Hours </TableCell>
    </TableRow>
  </TableFooter>
</Table>

     </Card>

    </div>
  )
}
