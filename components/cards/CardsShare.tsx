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
  }
  
  interface Attendance {
    id: string;
    studentId: string;
    checkIn: string;
  }
  
  export default function CardsShare() {
    const [latestArrivals, setLatestArrivals] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchLatestArrivals = async () => {
        const checkOut: Attendance[] = await getData("check-out");
        const students: Student[] = await getData("students");
  
        const today = new Date().toDateString();
  
        const latestArrivalsData: Student[] = checkOut
          .filter((attendance) => new Date(attendance.checkIn).toDateString() === today) // Filter check-ins for today
          .map((attendance) => {
            const student = students.find((student) => student.id === attendance.studentId);
            if (student) {
              return {
                id: student.id,
                name: student.name,
                email: student.email,
                checkIn: attendance.checkIn,
              };
            }
            return null;
          })
          .filter(Boolean) as Student[];
  
        setLatestArrivals(latestArrivalsData);
        setIsLoading(false); // Set loading state to false when data is fetched
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
            {isLoading ? (
              <p>Loading...</p> // Show loading paragraph while fetching data
            ) : latestArrivals.length === 0 ? (
              <p>No arrivals yet today.</p> // Show no arrivals paragraph if no check-ins for the day
            ) : (
              <div className="grid gap-6">
                {latestArrivals.map((student) => (
                  <div key={`${student.id}-${student.checkIn}`} className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`/avatars/${student.id}.png`} alt={student.name} />
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
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
  