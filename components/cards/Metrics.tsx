"use client"
import { useTheme } from "next-themes";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import getData from "@/utils/getData";
import { useEffect, useState } from "react";
import { format } from "date-fns";
// import { themes } from "@/registery/themes";
import { useConfig } from "@/hooks/use-config";
import { themes } from "@/registery/themes";

interface AttendanceRecord {
  id: string;
  checkIn: string;
  checkOut: string;
}

interface Theme {
  name: string;
  label: string;
  activeColor: {
    light: string;
    dark: string;
  };
  cssVars: {
    light: { [key: string]: string };
    dark: { [key: string]: string };
  };
  primaryColor?: string; // Add this property to the interface
}

interface GroupedData {
  date: string;
  totalHours: number;
}

export async function CardsMetric() {
  const [attendanceData, setAttendanceData] = useState<GroupedData[]>([]);
  const { theme: mode } = useTheme();
  const [config] = useConfig();
  const theme = themes.find((theme) => theme.name === config.theme) as Theme;

  useEffect(() => {
    async function fetchData() {
      try {
        const data: AttendanceRecord[] = await getData("/check-in");
        const groupedData: { [key: string]: GroupedData } = {};
        data.forEach((entry) => {
          const date = format(new Date(entry.checkIn), "yyyy-MM-dd");
          if (!groupedData[date]) {
            groupedData[date] = { date, totalHours: 0 };
          }
          const checkInTime = new Date(entry.checkIn).getTime();
          const checkOutTime = new Date(entry.checkOut).getTime();
          if (checkOutTime > checkInTime) { // Check if check-out time is after check-in time
            const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60);
            groupedData[date].totalHours += hoursWorked;
          }
        });
        const dataArray: GroupedData[] = Object.values(groupedData);
        setAttendanceData(dataArray);
      } catch (error) {
        console.error("Failed to fetch attendance data:", error);
      }
    }
  
    fetchData();
  }, []);
  
  return (
    <Card>
      <CardHeader>
      <CardTitle>Attendance Hours</CardTitle>
<CardDescription>Your attendance hours are ahead of where you normally are.</CardDescription>

      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={attendanceData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                            <span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Hours Worked</span>
                            <span className="font-bold">{payload[0].payload.totalHours.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="totalHours"
                strokeWidth={2}
                stroke={theme?.primaryColor || "#007bff"}
                activeDot={{ r: 8, fill: "var(--theme-primary)" }}
              />
              {/* Add line for the goal of 9 hours a day */}
              <Line
                type="monotone"
                dataKey={() => 9} // Constant function for goal of 9 hours
                stroke="var(--theme-secondary)"
                strokeWidth={2}
                strokeDasharray="3 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
