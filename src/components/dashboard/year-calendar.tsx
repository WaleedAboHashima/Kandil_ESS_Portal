import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isToday,
  isSameMonth,
  parseISO,
  getDay,
} from "date-fns";
import { useUserLeaves } from "@/queries/leaves";
import { RequestLeaveDialog } from "@/components/leaves/request-leave-dialog";
import { ToastInfo } from "@/components/Toast";

// Custom weekend checker for Friday (5) and Saturday (6)
const isWeekend = (date: Date) => {
  const day = getDay(date);
  return day === 5 || day === 6;
};

interface YearCalendarProps {
  onDateClick?: (date: Date) => void;
}

export function YearCalendar({ onDateClick }: YearCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: userLeavesData, isLoading } = useUserLeaves();

  const currentYear = new Date().getFullYear();
  const yearStart = startOfYear(new Date(currentYear, 0, 1));
  const yearEnd = endOfYear(new Date(currentYear, 0, 1));

  // Get all leave dates
  const leaveDates = useMemo(() => {
    if (!userLeavesData) return new Set<string>();

    const dates = new Set<string>();

    Object.values(userLeavesData).forEach((categories) => {
      categories.forEach((category) => {
        category.data.forEach((leave) => {
          // Only consider approved or pending leaves
          if (leave.status !== "refused") {
            const startDate = parseISO(leave.date_from);
            const endDate = parseISO(leave.date_to);

            const datesInRange = eachDayOfInterval({
              start: startDate,
              end: endDate,
            });
            datesInRange.forEach((date) => {
              dates.add(format(date, "yyyy-MM-dd"));
            });
          }
        });
      });
    });

    return dates;
  }, [userLeavesData]);

  const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });

  const handleDateClick = (date: Date) => {
    if (isWeekend(date)) return; // Don't allow selecting weekends

    // Check if date already has a leave request
    const dateStr = format(date, "yyyy-MM-dd");
    if (leaveDates.has(dateStr)) {
      ToastInfo("This date already has a leave request");
      return;
    }

    setSelectedDate(date);
    setDialogOpen(true);
    onDateClick?.(date);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <MonthCalendarSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {months.map((month) => (
          <MonthCalendar
            key={month.toISOString()}
            month={month}
            leaveDates={leaveDates}
            onDateClick={handleDateClick}
          />
        ))}
      </div>

      <RequestLeaveDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        preselectedDate={selectedDate || undefined}
      />
    </>
  );
}

function MonthCalendarSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Week day headers skeleton */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-4 mx-auto" />
            ))}
          </div>

          {/* Calendar days skeleton */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-md" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MonthCalendarProps {
  month: Date;
  leaveDates: Set<string>;
  onDateClick: (date: Date) => void;
}

function MonthCalendar({ month, leaveDates, onDateClick }: MonthCalendarProps) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get starting day of week (0 = Sunday)
  const startDay = getDay(monthStart);

  // Adjust for week starting on Sunday
  const emptyDays = Array(startDay).fill(null);

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">
          {format(month, "MMMM yyyy")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="text-center text-xs font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            {days.map((day) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const isLeaveDay = leaveDates.has(dateStr);
              const isTodayDate = isToday(day);
              const isCurrentMonth = isSameMonth(day, month);
              const isWeekendDay = isWeekend(day);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => onDateClick(day)}
                  disabled={isWeekendDay || !isCurrentMonth}
                  className={cn(
                    "aspect-square p-0 text-sm font-normal rounded-md transition-all",
                    "hover:bg-accent hover:text-accent-foreground",
                    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                    !isCurrentMonth && "text-muted-foreground",
                    isTodayDate &&
                      "bg-primary text-primary-foreground font-bold hover:bg-primary/90",
                    isLeaveDay &&
                      !isTodayDate &&
                      "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
                    isWeekendDay && "bg-muted/50",
                    !isWeekendDay &&
                      !isLeaveDay &&
                      !isTodayDate &&
                      "hover:ring-2 hover:ring-primary/20"
                  )}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
