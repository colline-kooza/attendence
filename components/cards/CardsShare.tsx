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
  checkIn: string;
  image?: string;
}

interface Attendance {
  id: string;
  studentId: string;
  checkIn: string;
}

export default function CardsShare({ checkOut = [], students = [] }: any) {
  const [latestArrivals, setLatestArrivals] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const checkOutData: Attendance[] = await getData("/check-out");
        const studentsData: Student[] = await getData("/students");

        const today = new Date().toDateString();

        const filteredCheckOut = checkOutData.filter(
          (attendance: Attendance) =>
            new Date(attendance.checkIn).toDateString() === today
        );

        const latestArrivalsData: Student[] = filteredCheckOut.map(
          (attendance: Attendance) => {
            const student = studentsData.find(
              (student: Student) => student.id === attendance.studentId
            );
            if (student) {
              console.log(student)
              return {
                id: student.id,
                image: student.image,
                name: student.name,
                email: student.email,
                checkIn: attendance.checkIn,
              };
            }
            return null;
          }
        ).filter(Boolean) as Student[];

        setLatestArrivals(latestArrivalsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
          {isLoading ? (
            <p>Loading...</p>
          ) : latestArrivals.length === 0 ? (
            <p>No arrivals yet today.</p>
          ) : (
            <div className="grid gap-6">
              {latestArrivals.map((student) => (
                <div
                  key={`${student.id}-${student.checkIn}`}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                      className='object-cover'
                        src={student.image}
                        alt={student.name}
                      />
                      <AvatarFallback>
                        {student.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {student.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {student.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(student.checkIn).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
