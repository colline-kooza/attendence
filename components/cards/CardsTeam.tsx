import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
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

export function CardsTeamMembers({ checkInData, checkOutData, studentsData }: Props) {
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
    <Card className="px-2">
      <CardHeader>
        <CardTitle>Weekly Rankings</CardTitle>
        <CardDescription>
          Desishub weekly analysis and review
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
      <h2 className="font-bold">Most Time Spent</h2>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={mostTimeSpent.image} alt="Image" />
              <AvatarFallback>{mostTimeSpent.name[0]}</AvatarFallback>
            </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{mostTimeSpent.name}</p>
                <p className="text-sm text-muted-foreground">Total Time Spent: {mostTimeSpent.totalTimeSpent} hours</p>
              </div>
            </div>
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                {bestEarlyArrival.checkInTime}{" "}
                  <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">
               
              </PopoverContent>
            </Popover> */}
          </div>

          <h2 className="font-bold">Best Early Arrival</h2>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={bestEarlyArrival.image} alt="Image" />
              <AvatarFallback>{bestEarlyArrival.name[0]}</AvatarFallback>
            </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{bestEarlyArrival.name}</p>
                <p className="text-sm text-muted-foreground">Earliest Arrival Time: {bestEarlyArrival.checkInTime} hours</p>

              </div>
            </div>
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                Total Time Spent: {mostTimeSpent.totalTimeSpent} hours
                  <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">
               
              </PopoverContent>
            </Popover> */}
          </div>

          <h2 className="font-bold">Late Checkout</h2>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={lateCheckout.image} alt="Image" />
              <AvatarFallback>{lateCheckout.name[0]}</AvatarFallback>
            </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{lateCheckout.name}</p>
                <p className="text-sm text-muted-foreground">Late Checkout Time: {lateCheckout.checkOutTime} hours</p>

              </div>
            </div>
            {/* <Popover >
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                Check-out hours
                  <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">

              <div className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
              <p className="text-sm text-muted-foreground">
              {lateCheckout.checkOutTime}
              </p>
              </div>
              </PopoverContent>
            </Popover> */}
          </div>
      </CardContent>
    </Card>
  );
}
