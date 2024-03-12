"use client"
import { addDays, startOfWeek, endOfWeek } from "date-fns";
import { Card, CardContent } from "../ui/card";
import { Calendar } from "../ui/calendar";

const currentDate = new Date();
const startOfWeekDate = startOfWeek(currentDate); 
const endOfWeekDate = endOfWeek(currentDate);

export function CardsCalendar() {
  return (
    <Card className="max-w-[100%] h-[100%]">
      <CardContent className="p-1 ">
        <Calendar
          numberOfMonths={1}
          mode="range"
          defaultMonth={startOfWeekDate}
          selected={{
            from: startOfWeekDate,
            to: endOfWeekDate,
          }}
        />
      </CardContent>
    </Card>
  );
}
