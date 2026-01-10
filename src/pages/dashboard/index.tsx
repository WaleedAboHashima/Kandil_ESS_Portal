import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    IconCalendarCheck,
    IconCalendarX,
    IconClock,
    IconCalendarClock,
} from "@tabler/icons-react";
import { useAttendance } from "@/queries/attendance";
import { useLeaveTypes } from "@/queries/leaves";
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isFuture, getDay, differenceInMinutes, differenceInHours } from "date-fns";
import { useMemo } from "react";
import { Link } from "@tanstack/react-router";

// Custom weekend checker for Friday (5) and Saturday (6)
const isWeekend = (date: Date) => {
    const day = getDay(date);
    return day === 5 || day === 6;
};

// Loading skeleton component for stat cards
function StatCardSkeleton() {
    return (
        <Card>
            <CardHeader className="pb-3">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-20" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-6 w-32" />
            </CardContent>
        </Card>
    );
}

export default function Dashboard() {
    const { data: attendanceRecords, isLoading: attendanceLoading } = useAttendance();
    const { data: leaveTypesData, isLoading: leavesLoading } = useLeaveTypes();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Calculate current month attendance stats
    const currentMonthStats = useMemo(() => {
        if (!attendanceRecords) return null;

        const now = new Date();
        const monthStart = startOfMonth(now);
        const monthEnd = endOfMonth(now);

        const monthRecords = attendanceRecords.filter((record) => {
            const checkInDate = parseISO(record.check_in);
            return checkInDate >= monthStart && checkInDate <= monthEnd;
        });

        let totalHours = 0;
        let presentDays = 0;

        monthRecords.forEach((record) => {
            if (record.check_in && record.check_out && record.check_out.trim() !== "") {
                const checkIn = parseISO(record.check_in);
                const checkOut = parseISO(record.check_out);
                const hours = differenceInHours(checkOut, checkIn);
                const minutes = differenceInMinutes(checkOut, checkIn) % 60;
                totalHours += hours + minutes / 60;
                presentDays++;
            } else if (record.check_in) {
                presentDays++;
            }
        });

        const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
        const workingDays = allDays.filter((day) => !isWeekend(day) && !isFuture(day)).length;
        const absentDays = workingDays - presentDays;
        const attendancePercentage = workingDays > 0 ? ((presentDays / workingDays) * 100).toFixed(1) : "0.0";

        return {
            presentDays,
            workingDays,
            absentDays,
            totalHours: Math.round(totalHours * 10) / 10,
            attendancePercentage,
            expectedHours: workingDays * 8,
        };
    }, [attendanceRecords]);

    // Get leave balance
    const leaveBalance = useMemo(() => {
        if (!leaveTypesData?.LeavesBalance) return null;
        const paidTimeOff = leaveTypesData.LeavesBalance["Paid Time Off"];
        return paidTimeOff || "0 / 0";
    }, [leaveTypesData]);

    const isLoading = attendanceLoading || leavesLoading;

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-6 py-4 md:py-6">
                    {/* Welcome Header */}
                    <div className="px-4 lg:px-6">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Welcome back, {user?.employee_name?.split(" ")[0] || "User"}!
                        </h1>
                        <p className="text-muted-foreground mt-1">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
                        {isLoading ? (
                            <>
                                <StatCardSkeleton />
                                <StatCardSkeleton />
                                <StatCardSkeleton />
                                <StatCardSkeleton />
                            </>
                        ) : (
                            <>
                                {/* Present Days Card */}
                                <Link to="/attendance">
                                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500 h-full">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <CardDescription>Present Days</CardDescription>
                                                <IconCalendarCheck className="size-5 text-green-600" />
                                            </div>
                                            <CardTitle className="text-3xl font-bold">
                                                {currentMonthStats?.presentDays || 0}/{currentMonthStats?.workingDays || 0}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                                                {currentMonthStats?.attendancePercentage || "0"}% Attendance
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                </Link>

                                {/* Leave Balance Card */}
                                <Link to="/leaves">
                                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500 h-full">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <CardDescription>Leave Balance</CardDescription>
                                                <IconCalendarClock className="size-5 text-blue-600" />
                                            </div>
                                            <CardTitle className="text-3xl font-bold">
                                                {leaveBalance?.split("/")[0]?.trim() || "0"}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
                                                Days available
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                </Link>

                                {/* Working Hours Card */}
                                <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardDescription>Working Hours</CardDescription>
                                            <IconClock className="size-5 text-purple-600" />
                                        </div>
                                        <CardTitle className="text-3xl font-bold">
                                            {currentMonthStats?.totalHours || 0}h
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Expected: {currentMonthStats?.expectedHours || 0}h
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Absent Days Card */}
                                <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-red-500">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardDescription>Absent Days</CardDescription>
                                            <IconCalendarX className="size-5 text-red-600" />
                                        </div>
                                        <CardTitle className="text-3xl font-bold">
                                            {currentMonthStats?.absentDays || 0}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                                            This month
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </>
                        )}
                    </div>

                    {/* Recent Attendance */}
                    <div className="px-4 lg:px-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Recent Attendance</CardTitle>
                                        <CardDescription>Last 5 working days</CardDescription>
                                    </div>
                                    <Link to="/attendance">
                                        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                            View All
                                        </Badge>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-3 p-3">
                                                <Skeleton className="h-10 w-10 rounded-lg" />
                                                <div className="flex-1 space-y-2">
                                                    <Skeleton className="h-4 w-32" />
                                                    <Skeleton className="h-3 w-24" />
                                                </div>
                                                <Skeleton className="h-6 w-12" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {attendanceRecords?.slice(0, 5).map((record) => {
                                            const checkIn = parseISO(record.check_in);
                                            const checkOut = record.check_out && record.check_out.trim() !== "" ? parseISO(record.check_out) : null;
                                            const hours = checkOut ? Math.round((differenceInMinutes(checkOut, checkIn) / 60) * 10) / 10 : 0;

                                            return (
                                                <div key={record.attendance_id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${checkOut ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
                                                            {checkOut ? (
                                                                <IconCalendarCheck className="size-4 text-green-600 dark:text-green-400" />
                                                            ) : (
                                                                <IconClock className="size-4 text-amber-600 dark:text-amber-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm">{format(checkIn, "EEEE, MMM d")}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {format(checkIn, "hh:mm a")} - {checkOut ? format(checkOut, "hh:mm a") : "In Progress"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {hours > 0 && (
                                                        <Badge variant="outline" className={hours > 8 ? "text-amber-600" : ""}>
                                                            {hours}h
                                                        </Badge>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        {(!attendanceRecords || attendanceRecords.length === 0) && (
                                            <div className="text-center py-8 text-muted-foreground">
                                                <IconCalendarX className="size-12 mx-auto mb-2 opacity-50" />
                                                <p>No attendance records yet</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
