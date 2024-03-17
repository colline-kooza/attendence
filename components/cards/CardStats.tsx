"use client"
import { useTheme } from "next-themes"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts"

import { useConfig } from "@/hooks/use-config"
import { ThemesTabs } from "../ThemeTabs"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
// import { themes } from "@/registery/themes"
import { useEffect, useState } from "react"
import getData from "@/utils/getData"
import { useSession } from "next-auth/react"


interface AttendanceRecord {
  id: string;
  studentId: string;
  checkIn: string;
  checkOut: string;
  createdAt: string;
  updatedAt: string;
}
const themes = [
  { name: "light", primaryColor: "#ea580c" },
  { name: "dark", primaryColor: "#e11d48" }
];
export function CardsStats() { 
  const { data: session, status } = useSession();
  const user = session?.user;
  const image = user?.image ||   'https://utfs.io/f/2c49867b-4d23-489c-b038-807f3d1d126e-2klm05.jpg'
  ;
    // console.log(image)
  const { theme: mode } = useTheme();
  // Assuming you have already set up your theme config to retrieve the correct theme
  const theme = themes.find((theme) => theme.name === mode);
  const [config] = useConfig()

  // const theme = themes.find((theme) => theme.name === config.theme)
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

  const calculateTotalHours = () => {
    let totalHours = 0;
    attendance.forEach((record) => {
      const checkInTime = new Date(record.checkIn).getTime();
      const checkOutTime = new Date(record.checkOut).getTime();
      if (checkOutTime > checkInTime) {
        const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60);
        totalHours += hoursWorked;
      }
    });
    return totalHours;
  };

  const totalHours = calculateTotalHours();
  const averageTime = totalHours / 7;

  const calculateWeeklyHours = () => {
    const weeklyHours = Array(7).fill(0);
    attendance.forEach((record) => {
      const checkInDate = new Date(record.checkIn);
      const dayOfWeek = checkInDate.getDay();
      const checkOutTime = new Date(record.checkOut).getTime();
      const checkInTime = checkInDate.getTime();
      if (checkOutTime > checkInTime) {
        const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60);
        weeklyHours[dayOfWeek] += hoursWorked;
      }
    });
    return weeklyHours;
  };
  
  const weeklyHoursData = calculateWeeklyHours();
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">


      {/* studentCard */}
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        </CardHeader>
        <CardContent className="flex items-center gap-4 w-full">
        <div className=" w-[40%] ">
          <img src={image}
          className="w-28 group-hover:w-36 group-hover:h-36 h-28 object-center object-cover -z-40 rounded-full transition-all duration-500 delay-500 transform"
         />
          </div>
       <div className="w-[60%] flex flex-col gap-2 lg:gap-1 items-center justify-center">
       <h2 className=" font-bold text-xl md:text-xl lg:text-xl text-center">
        {
          session?.user?.name
        }
        
         </h2>
          <p className="text-xs text-muted-foreground">
           Senior Dev At Desishub
          </p>

       </div>
          
        </CardContent>

      </Card>




      <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">Weekly Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalHours.toFixed(2)} hours</div>
        <p className="text-xs text-muted-foreground">
          Average time: {averageTime.toFixed(2)} hours per day
        </p>
        <div className="mt-4 h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyHoursData.map((hours, index) => ({ day: index, hours }))}>
              <Bar
                dataKey="hours"
                fill={theme?.primaryColor || "#007bff"}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}



{/* <Card>
<CardTitle className="text-base font-normal">Weekly Attendance</CardTitle>
<div className="text-2xl font-bold">{totalHours.toFixed(2)} hours</div>
<p className="text-xs text-muted-foreground">Average time: {averageTime.toFixed(2)} hours per day</p>
<div className="mt-4 h-[200px]">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={[{ hours: totalHours }]}>
      <Bar
        dataKey="hours"
        style={{ fill: "var(--theme-primary)", opacity: 1 }}
      />
    </BarChart>
  </ResponsiveContainer>
</div>
</Card> */}