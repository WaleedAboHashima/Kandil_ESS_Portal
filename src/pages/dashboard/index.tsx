import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IconCalendarClock } from "@tabler/icons-react";
import { useLeaveTypes } from "@/queries/leaves";
import { format } from "date-fns";
import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { YearCalendar } from "@/components/dashboard/year-calendar";
import { translateLeaveType } from "@/lib/translations";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Loading skeleton component for leave balance cards
function LeaveBalanceCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-8 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-20" />
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { data: leaveTypesData, isLoading: leavesLoading } = useLeaveTypes();

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const firstName = user?.employee_name?.split(" ")[0] || "User";

  // Get all leave balances
  const leaveBalances = useMemo(() => {
    if (!leaveTypesData?.LeavesBalance) return [];
    return Object.entries(leaveTypesData.LeavesBalance).map(
      ([type, balance]) => ({
        type,
        balance,
      })
    );
  }, [leaveTypesData]);

  const leaveTypeColors = [
    "border-l-blue-500",
    "border-l-green-500",
    "border-l-purple-500",
    "border-l-orange-500",
    "border-l-pink-500",
    "border-l-indigo-500",
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 py-4 md:py-6">
          {/* Welcome Header */}
          <div className="flex items-center gap-2 px-4 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, {firstName}!
              </h1>
              <p className="text-muted-foreground mt-1">
                {format(new Date(), "EEEE, MMMM d, yyyy")}
              </p>
            </div>
          </div>

          {/* Leave Balances Grid */}
          <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
            {leavesLoading ? (
              <>
                <LeaveBalanceCardSkeleton />
                <LeaveBalanceCardSkeleton />
                <LeaveBalanceCardSkeleton />
              </>
            ) : (
              <>
                {leaveBalances.map((leave, index) => {
                  const [used, total] = leave.balance
                    .split("/")
                    .map((v) => v.trim());
                  const arabicName = translateLeaveType(leave.type);
                  return (
                    <Link key={leave.type} to="/leaves">
                      <Card
                        className={`cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 h-full ${leaveTypeColors[index % leaveTypeColors.length]}`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardDescription
                              className="text-lg font-almarai"
                              dir="rtl"
                            >
                              {arabicName}
                            </CardDescription>
                            <IconCalendarClock className="size-5 text-primary" />
                          </div>
                          <CardTitle className="text-3xl font-bold">
                            {used}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg text-muted-foreground font-almarai">
                            من {total} أيام
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </>
            )}
          </div>

          {/* Year Calendar */}
          <div className="px-4 lg:px-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Leave Calendar {new Date().getFullYear()}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Click on any date to request a leave.
                <span className="inline-flex items-center gap-2 ml-2">
                  <span className="inline-block w-3 h-3 rounded bg-primary"></span>
                  <span>Today</span>
                  <span className="inline-block w-3 h-3 rounded bg-gray-300 dark:bg-gray-700 ml-2"></span>
                  <span>Requested Leave</span>
                </span>
              </p>
            </div>
            <YearCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
