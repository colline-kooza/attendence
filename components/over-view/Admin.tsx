"use client"
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon, Eye, Pencil, Trash2 } from "lucide-react";
import getData from '@/utils/getData';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table';
import DeleteStudent from '../DeleteStudent';
import { PiSpinner } from 'react-icons/pi'

import Link from 'next/link';
import { Label } from '../ui/label';
import { useForm } from 'react-hook-form';
import { toast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';

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
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data:any) => {
    // console.log(data)
    setLoading(true);
    try {
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    //   const response = await fetch(`${baseUrl}/api/order/${orderId}`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   if (response.ok) {
    //             toast({
    //                 title: "Order Status Updated",
    //                 description: "Status was Edited.",
    //                 action: <ToastAction altText="Make Other">close</ToastAction>,
    //             });
    //             setLoading(false);
    //           reset(); 
    //           window.location.reload()
    //   } else {
    //             toast({
    //                 variant: "destructive",
    //                 title: "Uh oh! Failed to Edit.",
    //                 description: "There was a problem with your Edit.",
    //                 action: <ToastAction altText="Try again">Try again</ToastAction>,
    //             });
    //             setLoading(false)
    //             window.location.reload()

    //         }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

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
      <TableHead></TableHead>
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

            <TableCell className="whitespace-nowrap ml-5 flex items-center">
            <Popover>
            <PopoverTrigger>
            <Button
             title="View Product"
             className="text-green-600 bg-black"
            >
            <Pencil className="w-8 h-4" />
          </Button>
            </PopoverTrigger>
            <PopoverContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                  <Card>
                    <CardHeader>
                      <CardTitle className='font-bold text-lg'>Change Order Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label className='text-sm' htmlFor="status">Status</Label>
                          <select id="large" {...register('status')} className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="kitchen">In kitchen</option>
                  <option value="wait list">Wait List</option>
                  <option value="ready">Ready</option>
                <option value="served">Served</option>
                  </select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                    {
                     loading ? 
                      (
                      <Button variant='outline' disabled={loading}  className="w-full flex gap-2 items-center bg-slate-950 text-white">
                      <PiSpinner className="animate-spin"/> Updating Attendance
                      </Button>
                      ):(
                      <Button type="submit" >Update Attendance Status</Button>
                      )
                      }
                    </CardFooter>
                </Card>

                </form>

            </PopoverContent>
            </Popover>
                    <div className="flex gap-4 pt-2">
                    
                    </div>
          </TableCell>
       
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
