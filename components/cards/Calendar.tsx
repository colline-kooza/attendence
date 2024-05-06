import { getWeek, startOfWeek, endOfWeek } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { Card, CardContent } from "../ui/card";
import { Calendar } from "../ui/calendar";

const currentDate = new Date();
const currentWeek = getWeek(currentDate, { weekStartsOn: 1 }); 

const currentWeekStartDate = startOfWeek(toZonedTime(currentDate, 'your_timezone_here'), { weekStartsOn: 1 });
const currentWeekEndDate = endOfWeek(toZonedTime(currentDate, 'your_timezone_here'), { weekStartsOn: 1 });

export function CardsCalendar() {
  return (
    <Card className="max-w-[100%] h-[100%]">
      <CardContent className="p-1 ">
        <Calendar
          numberOfMonths={1}
          mode="range"
          defaultMonth={currentWeekStartDate}
          selected={{
            from: currentWeekStartDate,
            to: currentWeekEndDate,
          }}
        />
      </CardContent>
    </Card>
  );
}
