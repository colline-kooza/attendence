  "use client"
  import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import getData from "@/utils/getData";
import { Calendar, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
// import ReactGantt, { GanttRow } from 'react-gantt';

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
              // console.log(student)
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
   <div>
    <div className='flex justify-between items-center'>
      <h2 className='flex items-center gap-2 text-sm'> <Calendar className='text-[#9333ea]' size={16}/>today's attendance</h2>
      <div className='flex items-center gap-2'>
     <Link href="/dashboard/attendence">
     <Button className='bg-white text-xs dark:bg-black text-black dark:text-white shadow1 flex items-center gap-2 dark:hover:bg-amber-500 hover:bg-amber-500 hover:text-white'><Plus size={12}/> New attendance</Button>
     </Link>
     
      </div>
    </div>
    <Separator className="my-4" />

    <div className='flex w-full min-h-screen relative'>
      <div className=' lg:w-[5%] w-[16%] flex justify-between '>
      <Separator  orientation="vertical" />
      <div className="flex flex-col w-full gap-2 px-2">
  {[...Array(9)].map((_, index) => {
    const hour = index + 5; // Start from 5 in the morning
    const formattedHour = hour < 10 ? `0${hour}` : hour; // Format hours with leading zero if needed
    return (
      <div key={index} className='w-full h-[25%]'>
        <h2 className='text-sm font-medium'>{`${formattedHour}:30`}</h2>
      </div>
    );
  })}
       </div>
        <Separator  orientation="vertical" />
      </div>
      <div className=' w-[95%] p-2 flex flex-col gap-2 '>
      {latestArrivals.length === 0 ? (
    <Card className='lg:w-[60%] w-full lg:h-[25%] h-[20%] rounded-xl supports-[backdrop-filter]:bg-background/60 bg-background/95 backdrop-blur'>
     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
     <CardTitle className="text-sm font-medium">{new Date().toLocaleDateString().replace(/'/g, "\\'")}</CardTitle>


      <h2 className='font-semibold'>0:00</h2>
    </CardHeader>
    <CardContent>
      <div className="lg:text-2xl text-lg font-bold">No Arrivals today</div>
      <p className="text-xs text-muted-foreground">
        We haven't recorded any arrivals today
      </p>
    </CardContent>
  </Card>
  ) : (
   <>
    {latestArrivals
      .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()) 
      .map((student: Student) => (
      <Card key={student.id} className='lg:w-[60%] w-full lg:h-[25%] h-[20%] rounded-xl supports-[backdrop-filter]:bg-background/60 bg-background/95 backdrop-blur'>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{new Date().toLocaleDateString().replace(/'/g, "\\'")}</CardTitle>
          <h2 className='font-semibold'>{new Date(student.checkIn).toLocaleTimeString()}</h2>
        </CardHeader>
        <CardContent>
          <div className="lg:text-2xl text-lg font-bold">{student.name}</div>
          <p className="text-xs text-muted-foreground">
            {student.email}
          </p>
        </CardContent>
      </Card>
    ))}
  </>
)}
      </div>
      <div className='hidden md:block md:right-[1%] lg:block sticky top-[20%] right-[10%] h-[20vh]'>
      <Card className='w-[400px] h-[300px] supports-[backdrop-filter]:bg-background/60 bg-background/95 backdrop-blur flex flex-col justify-center items-center'>
      <CardContent className='flex flex-col items-center justify-center gap-1'>
      <Calendar className='text-[#9333ea] font-bold' size={40}/>
      <div className="text-lg font-semibold">Daily attendance list will change daily </div>
        <p className="text-xs text-muted-foreground">
        These are the latest check ins recorded today
        </p>
        <Link href="/dashboard/attendence">
        <Button className='hover:text-white text-xs hover:bg-black text-black font-semibold shadow1 flex items-center gap-2 dark:hover:text-white bg-amber-500 dark:text-black  mt-4'><Plus size={12}/> New attendance</Button>
        </Link>
      </CardContent>
        </Card>
      </div>
    </div>
   </div>
  );
}




















    // <Card>
    //   <CardHeader className="pb-3">
    //     <CardTitle>Latest Arrivals Today</CardTitle>
    //     <CardDescription>
    //       Latest Desishub Arrivals Today and their time.
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <Separator className="my-4" />
    //     <div className="space-y-4">
    //       <h4 className="text-sm font-medium">Desishub Students</h4>
    //       {isLoading ? (
    //         <p>Loading...</p>
    //       ) : latestArrivals.length === 0 ? (
    //         <p>No arrivals yet today.</p>
    //       ) : (
    //         <div className="grid gap-6">
    //           {latestArrivals.map((student) => (
    //             <div
    //               key={`${student.id}-${student.checkIn}`}
    //               className="flex items-center justify-between space-x-4"
    //             >
    //               <div className="flex items-center space-x-4">
    //                 <Avatar>
    //                   <AvatarImage
    //                   className='object-cover'
    //                     src={student.image}
    //                     alt={student.name}
    //                   />
    //                   <AvatarFallback>
    //                     {student.name.slice(0, 2).toUpperCase()}
    //                   </AvatarFallback>
    //                 </Avatar>
    //                 <div>
    //                   <p className="text-sm font-medium leading-none">
    //                     {student.name}
    //                   </p>
    //                   <p className="text-sm text-muted-foreground">
    //                     {student.email}
    //                   </p>
    //                 </div>
    //               </div>
    //               <div>
    //                 <p className="text-sm text-muted-foreground">
    //                   {new Date(student.checkIn).toLocaleTimeString()}
    //                 </p>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   </CardContent>
    // </Card>