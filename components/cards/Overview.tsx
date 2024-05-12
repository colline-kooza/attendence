"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface StudentData {
  id: string;
  name: string;
}

interface CheckOutRecord {
  id: string;
  studentId: string;
  checkIn: string;
  checkOut: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface OverviewProps {
  checkOutData: CheckOutRecord[];
  studentsData: StudentData[];
}

const Overview: React.FC<any> = ({ checkOutData, studentsData }) => {
  const weeklyAttendance: { [key: string]: { name: string; attendance: number[] } } = {};

  checkOutData.forEach((record:any) => {
    const weekStart = new Date(record.checkIn).getDay(); 
    const studentId = record.studentId;

    if (weekStart >= 1 && weekStart <= 5) {
      if (!weeklyAttendance[studentId]) {
        weeklyAttendance[studentId] = { name: studentsData.find((student:any) => student.id === studentId)?.name || "", attendance: [0, 0, 0, 0, 0] };
      }

      weeklyAttendance[studentId].attendance[weekStart - 1]++;
    }
  });

  const data = Object.keys(weeklyAttendance).map((studentId) => {
    const student = weeklyAttendance[studentId];
    const total = student.attendance.reduce((acc, val) => acc + val, 0);
    const weeklyAverage = total / 5;

    return { name: student.name, total: weeklyAverage };
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value.toFixed(2)}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
