"use client"
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import getData from "@/utils/getData";

interface Student {
  id: string;
  name: string;
  email: string;
  image: string;
  checkIn: string;
}

interface Attendance {
  id: string;
  studentId: string;
  checkIn: string;
}

export default function CardsShare() {
  const [latestArrivals, setLatestArrivals] = useState<Student[]>([]);
// console.log(latestArrivals)
  useEffect(() => {
    const fetchLatestArrivals = async () => {
      const checkOut: Attendance[] = await getData("check-out");
      const students: Student[] = await getData("students");

      const latestArrivalsPerDay: Record<string, Attendance[]> = {};

      checkOut.forEach((attendance) => {
        const date = new Date(attendance.checkIn).toDateString();
        if (!latestArrivalsPerDay[date] || latestArrivalsPerDay[date][0].checkIn < attendance.checkIn) {
          latestArrivalsPerDay[date] = [attendance];
        } else if (latestArrivalsPerDay[date][0].checkIn === attendance.checkIn) {
          latestArrivalsPerDay[date].push(attendance);
        }
      });

      const latestArrivalsData: Student[] = Object.values(latestArrivalsPerDay).flatMap((attendances) => {
        return attendances.map((attendance) => {
          const student = students.find((student) => student.id === attendance.studentId);
          console.log(student)
          if (student) {
            return {
              id: student.id,
              name: student.name,
              email: student.email,
              image: student.image,
              checkIn: attendance.checkIn 
            };
          }
          return null;
        }).filter(Boolean) as Student[];
      });
      
      setLatestArrivals(latestArrivalsData);
    };

    fetchLatestArrivals();
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Latest Arrivals Today</CardTitle>
        <CardDescription>
          Latest Desishub Arrivals Today and their time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Desishub Students</h4>
          <div className="grid gap-6">
  {latestArrivals.length === 0 ? (
    <p>No arrivals yet today.</p>
  ) : (
    latestArrivals.map((student) => (
      <div key={`${student.id}-${student.checkIn}`} className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={student.image} alt={student.name} />
            <AvatarFallback>{student.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{student.name}</p>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{new Date(student.checkIn).toLocaleTimeString()}</p>
        </div>
      </div>
    ))
  )}
</div>

        </div>
      </CardContent>
    </Card>
  )
}
