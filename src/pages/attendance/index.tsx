import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    IconCalendarCheck,
    IconCalendarX,
    IconClock,
    IconClockHour9,
    IconClockHour5,
    IconBeach,
    IconRun,
    IconFileText,
} from "@tabler/icons-react";
import { useState } from "react";
import {
    useAttendanceSummary,
    useAttendanceStatus,
    useAttendance,
} from "@/queries/attendance";
import {
    format,
    parseISO,
    isFuture,
    isToday,
} from "date-fns";

export default function Attendance() {
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(
        format(currentDate, "yyyy-MM")
    );

    const [year, month] = selectedMonth.split("-").map(Number);

    const { data: summaryData, isLoading: isLoadingSummary } =
        useAttendanceSummary(month, year);
    const {
        data: statusData,
        isLoading: isLoadingStatus,
        error: statusError,
    } = useAttendanceStatus(month, year);

    const { data: allAttendanceData, isLoading: isLoadingAll } = useAttendance();

    // Get the saved user timezone from session
    const userTz = (() => {
        try {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                const user = JSON.parse(userStr);
                return user.tz;
            }
        } catch (e) {
            console.error("Error getting user tz", e);
        }
        return undefined;
    })();

    const getDayStatusBadge = (details: string) => {
        if (details.includes("يوم عمل")) {
            return (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                    Work Day
                </Badge>
            );
        } else if (details.includes("يوم راحه")) {
            return (
                <Badge
                    variant="outline"
                    className="bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400"
                >
                    Rest Day
                </Badge>
            );
        } else if (details.includes("غياب")) {
            return (
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                    Absent
                </Badge>
            );
        } else if (details.includes("Sick Leave")) {
            return (
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
                    Sick Leave
                </Badge>
            );
        } else {
            return <Badge variant="outline">{details}</Badge>;
        }
    };

    const formatInTimeZone = (
        dateStr: string | false | undefined,
        timeZone: string | false | undefined,
        type: "date" | "time"
    ) => {
        const effectiveTz = timeZone || userTz || "Africa/Cairo";
        if (!dateStr || !effectiveTz) return "-";
        try {
            // Treat the Odoo datetime string (YYYY-MM-DD HH:mm:ss) as UTC
            const date = new Date(dateStr.replace(" ", "T") + "Z");
            if (isNaN(date.getTime())) return "-";

            const options: Intl.DateTimeFormatOptions =
                type === "date"
                    ? { month: "short", day: "numeric", year: "numeric", timeZone: effectiveTz as string }
                    : {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                        timeZone: effectiveTz as string,
                    };

            return new Intl.DateTimeFormat("en-US", options).format(date);
        } catch (error) {
            console.error("Timezone formatting error:", error);
            return dateStr; // Fallback to raw string
        }
    };

    if (statusError) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-red-600">
                            Error Loading Attendance
                        </CardTitle>
                        <CardDescription>
                            Failed to fetch attendance records. Please try again later.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    const isLoading = isLoadingSummary || isLoadingStatus || isLoadingAll;
    const summary = summaryData?.data?.[0];
    const hasAnyData = summary || (allAttendanceData && allAttendanceData.length > 0) || (statusData?.data && statusData.data.length > 0);

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="flex items-center justify-between px-4 lg:px-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
                            <p className="text-muted-foreground">
                                Track your attendance and working hours
                            </p>
                        </div>
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2026-01">January 2026</SelectItem>
                                <SelectItem value="2025-12">December 2025</SelectItem>
                                <SelectItem value="2025-11">November 2025</SelectItem>
                                <SelectItem value="2025-10">October 2025</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-muted-foreground">
                                Loading attendance records...
                            </div>
                        </div>
                    ) : hasAnyData ? (
                        <>
                            {/* New Summary Cards */}
                            {summary && (
                                <div className="px-4 lg:px-6">
                                    <Card className="border-2">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle className="text-xl">
                                                        {summary.month} {summary.year}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {summaryData?.employee} - {summaryData?.code}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                                {/* Target Days */}
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <IconCalendarCheck className="size-4" />
                                                        Target Days
                                                    </p>
                                                    <p className="text-2xl font-bold">
                                                        {summary.target_days}
                                                    </p>
                                                </div>

                                                {/* Attendance Days */}
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <IconCalendarCheck className="size-4 text-green-600" />
                                                        Attendance
                                                    </p>
                                                    <p className="text-2xl font-bold text-green-600">
                                                        {summary.attendance_days}
                                                    </p>
                                                </div>

                                                {/* Absent Days */}
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <IconCalendarX className="size-4 text-red-600" />
                                                        Absent
                                                    </p>
                                                    <p className="text-2xl font-bold text-red-600">
                                                        {summary.absent_days}
                                                    </p>
                                                </div>

                                                {/* Rest Days */}
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <IconBeach className="size-4 text-blue-600" />
                                                        Rest Days
                                                    </p>
                                                    <p className="text-2xl font-bold">
                                                        {summary.rest_days}
                                                    </p>
                                                </div>

                                                {/* Target Hours */}
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <IconClock className="size-4" />
                                                        Target
                                                    </p>
                                                    <p className="text-2xl font-bold">{summary.target}</p>
                                                </div>

                                                {/* Actual Hours */}
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <IconClock className="size-4 text-purple-600" />
                                                        Actual
                                                    </p>
                                                    <p className="text-2xl font-bold text-purple-600">
                                                        {summary.final_actual}
                                                    </p>
                                                </div>

                                                {/* Overtime Days */}
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <IconClockHour9 className="size-4 text-amber-600" />
                                                        Overtime Days
                                                    </p>
                                                    <p className="text-2xl font-bold">
                                                        {summary.overtime_totalday}
                                                    </p>
                                                </div>

                                                {/* Public Holidays */}
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <IconCalendarCheck className="size-4 text-indigo-600" />
                                                        Holidays
                                                    </p>
                                                    <p className="text-2xl font-bold">
                                                        {summary.public_holidays}
                                                    </p>
                                                </div>

                                                {/* Half Days */}
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <IconClockHour5 className="size-4" />
                                                        Half Days
                                                    </p>
                                                    <p className="text-2xl font-bold">{summary.half_day}</p>
                                                </div>

                                                {/* Missions */}
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <IconRun className="size-4" />
                                                        Missions
                                                    </p>
                                                    <p className="text-2xl font-bold">{summary.missions}</p>
                                                </div>

                                                {/* Permissions */}
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <IconFileText className="size-4" />
                                                        Permissions
                                                    </p>
                                                    <p className="text-2xl font-bold">
                                                        {summary.permission}
                                                    </p>
                                                </div>

                                                {/* Continuous Requests */}
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <IconFileText className="size-4" />
                                                        Cont. Requests
                                                    </p>
                                                    <p className="text-2xl font-bold">
                                                        {summary.continuous_request}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {/* Tabs for Month and Day Views */}
                            <div className="px-4 lg:px-6">
                                <Tabs defaultValue="history" className="w-full">
                                    <TabsList className="grid w-full max-w-lg grid-cols-2">
                                        <TabsTrigger value="history">History</TabsTrigger>
                                        <TabsTrigger value="month">Month View</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="history" className="mt-4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Attendance History</CardTitle>
                                                <CardDescription>
                                                    Raw check-in and check-out logs
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                {!allAttendanceData || allAttendanceData.length === 0 ? (
                                                    <div className="flex items-center justify-center py-8">
                                                        <div className="text-muted-foreground">
                                                            No attendance logs found
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="overflow-auto rounded-lg border">
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>Date</TableHead>
                                                                    <TableHead>Check In</TableHead>
                                                                    <TableHead>Check Out</TableHead>
                                                                    <TableHead>Location</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {[...allAttendanceData]
                                                                    .sort((a, b) => new Date(b.check_in.replace(' ', 'T')).getTime() - new Date(a.check_in.replace(' ', 'T')).getTime())
                                                                    .map((record) => (
                                                                        <TableRow
                                                                            key={record.attendance_id}
                                                                        >
                                                                            <TableCell className="font-medium">
                                                                                {formatInTimeZone(
                                                                                    record.check_in,
                                                                                    record.employee_tz || userTz,
                                                                                    "date"
                                                                                )}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {formatInTimeZone(
                                                                                    record.check_in,
                                                                                    record.employee_tz || userTz,
                                                                                    "time"
                                                                                )}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {record.check_out &&
                                                                                    record.check_out !==
                                                                                    record.check_in
                                                                                    ? formatInTimeZone(
                                                                                        record.check_out,
                                                                                        record.employee_tz || userTz,
                                                                                        "time"
                                                                                    )
                                                                                    : record.check_out ===
                                                                                        record.check_in
                                                                                        ? "-"
                                                                                        : "Ongoing"}
                                                                            </TableCell>
                                                                            <TableCell className="max-w-[200px] truncate">
                                                                                {record.check_in_location ||
                                                                                    record.location ||
                                                                                    "-"}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    <TabsContent value="month" className="mt-4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Monthly Attendance Status</CardTitle>
                                                <CardDescription>
                                                    Detailed daily attendance status for{" "}
                                                    {format(new Date(year, month - 1), "MMMM yyyy")}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                {isLoadingStatus ? (
                                                    <div className="flex items-center justify-center py-8">
                                                        <div className="text-muted-foreground">
                                                            Loading status data...
                                                        </div>
                                                    </div>
                                                ) : statusError ? (
                                                    <div className="flex items-center justify-center py-8">
                                                        <div className="text-red-600">
                                                            Error loading status data:{" "}
                                                            {(statusError as Error).message ||
                                                                "Unknown error"}
                                                        </div>
                                                    </div>
                                                ) : !statusData?.data ||
                                                    statusData.data.length === 0 ? (
                                                    <div className="flex items-center justify-center py-8">
                                                        <div className="text-muted-foreground">
                                                            No status data available for this month
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="overflow-auto rounded-lg border">
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>Date</TableHead>
                                                                    <TableHead>Day</TableHead>
                                                                    <TableHead>Shift</TableHead>
                                                                    <TableHead>In Time</TableHead>
                                                                    <TableHead>Out Time</TableHead>
                                                                    <TableHead>Late In</TableHead>
                                                                    <TableHead>Early In</TableHead>
                                                                    <TableHead>Worked Hours</TableHead>
                                                                    <TableHead>Overtime</TableHead>
                                                                    <TableHead>Status</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {statusData.data.map((day, index) => {
                                                                    const dayDate = parseISO(day.date);
                                                                    const isFutureDay =
                                                                        isFuture(dayDate) && !isToday(dayDate);

                                                                    return (
                                                                        <TableRow
                                                                            key={index}
                                                                            className={
                                                                                isFutureDay
                                                                                    ? "opacity-40 pointer-events-none"
                                                                                    : ""
                                                                            }
                                                                        >
                                                                            <TableCell className="font-medium">
                                                                                {format(dayDate, "MMM d")}
                                                                            </TableCell>
                                                                            <TableCell>{day.day}</TableCell>
                                                                            <TableCell>{day.shift_id}</TableCell>
                                                                            <TableCell>
                                                                                {day.in_time !== "00:00"
                                                                                    ? day.in_time
                                                                                    : "-"}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {day.out_time !== "00:00"
                                                                                    ? day.out_time
                                                                                    : "-"}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {day.late_in !== "00:00"
                                                                                    ? day.late_in
                                                                                    : "-"}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {day.early_in !== "00:00"
                                                                                    ? day.early_in
                                                                                    : "-"}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {day.worked_hours !== "00:00"
                                                                                    ? day.worked_hours
                                                                                    : "-"}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {day.overtime !== "00:00"
                                                                                    ? day.overtime
                                                                                    : "-"}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {getDayStatusBadge(day.details)}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    );
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                </Tabs>
                            </div>
                        </>
                    ) : (
                        <div className="py-12 text-center text-muted-foreground">
                            No data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
