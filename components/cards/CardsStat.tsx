import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Overview from './Overview'
import { RecentSales } from './RecentStats'
import { getWeek } from 'date-fns';


export interface Student {
    id: string;
    name: string;
    image: string;
  }
  
  interface CheckIn {
    id: string;
    studentId: string;
    checkIn: string; 
  }
  
  interface CheckOut {
    id: string;
    studentId: string;
    checkOut: string;
  }
  
  interface Props {
    checkInData: CheckIn[];
    checkOutData: CheckOut[];
    studentsData: Student[];
  }
export default function CardsStat({studentsData ,  checkOutData , checkInData}:Props) {
      // Calculate check-in time for the week
  const calculateCheckInTime = (studentId: string) => {
    const currentWeek = getWeek(new Date()); 
    const checkIns = checkInData?.filter((item) => {
      const week = getWeek(new Date(item.checkIn)); 
      return item.studentId === studentId && week === currentWeek;
    });
    if (!checkIns || checkIns.length === 0) return 0;
    return checkIns.reduce((total, checkIn) => total + new Date(checkIn.checkIn).getHours(), 0);
  };

  const calculateCheckOutTime = (studentId: string) => {
    const currentWeek = getWeek(new Date());
    const checkOuts = checkOutData?.filter((item) => {
      const week = getWeek(new Date(item.checkOut));
      return item.studentId === studentId && week === currentWeek;
    });
    if (!checkOuts || checkOuts.length === 0) return 0;
    return checkOuts.reduce((total, checkOut) => total + new Date(checkOut.checkOut).getHours(), 0);
  };

  const calculateTotalTimeSpent = (studentId: string) => {
    const currentWeek = getWeek(new Date());
    const checkIns = checkInData?.filter((item) => {
      const week = getWeek(new Date(item.checkIn));
      return item.studentId === studentId && week === currentWeek;
    });
    const checkOuts = checkOutData?.filter((item) => {
      const week = getWeek(new Date(item.checkOut));
      return item.studentId === studentId && week === currentWeek;
    });
    if (!checkIns || !checkOuts || checkIns.length === 0 || checkOuts.length === 0) return 0;
    let totalTime = 0;
    checkIns.forEach((checkIn) => {
      const checkOut = checkOuts.find((item) => item.id === checkIn.id);
      if (checkOut) {
        const checkInTime = new Date(checkIn.checkIn).getTime();
        const checkOutTime = new Date(checkOut.checkOut).getTime();
        totalTime += (checkOutTime - checkInTime) / (1000 * 60 * 60);
      }
    });
    return totalTime;
  };

  const rankedStudents = studentsData.map((student) => ({
    ...student,
    checkInTime: calculateCheckInTime(student.id),
    checkOutTime: calculateCheckOutTime(student.id),
    totalTimeSpent: calculateTotalTimeSpent(student.id),
  }));

  const bestEarlyArrival = rankedStudents.reduce((prev, current) =>
    prev.checkInTime > current.checkInTime ? prev : current
  );
  const mostTimeSpent = rankedStudents.reduce((prev, current) =>
    prev.totalTimeSpent > current.totalTimeSpent ? prev : current
  );
  const lateCheckout = rankedStudents.reduce((prev, current) =>
    prev.checkOutTime < current.checkOutTime ? prev : current
  );

  return (
    <div className='space-y-3'>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Most Time Spent
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mostTimeSpent.name}</div>
                    <p className="text-xs text-muted-foreground">
                    Total Time Spent: {mostTimeSpent.totalTimeSpent} hours
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Best Early Arrival
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{bestEarlyArrival.name}</div>
                    <p className="text-xs text-muted-foreground">
                    Earliest Arrival Time: {bestEarlyArrival.checkInTime} hours
                    </p>
                  </CardContent>
                </Card>
                <Card className='h-[150px]'>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Late Checkout</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{lateCheckout.name}</div>
                    <p className="text-xs text-muted-foreground">
                    Late Checkout Time: {lateCheckout.checkOutTime} hours
                    </p>
                  </CardContent>
                </Card>
               
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview Attendance</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview studentsData={studentsData} checkOutData={checkOutData}  checkInData={checkInData}/>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>All students</CardTitle>
                    <CardDescription>
                      Displaying all students data and there total time.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales studentsData={studentsData} attendance={checkOutData} />
                  </CardContent>
                </Card>
              </div>
    </div>
  )
}
