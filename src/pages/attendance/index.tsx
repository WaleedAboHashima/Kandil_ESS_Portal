import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconCalendarCheck, IconCalendarX, IconClock, IconClockHour9, IconClockHour5, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { useState } from "react"

const monthlyData = {
    month: "December 2025",
    totalDays: 23,
    presentDays: 22,
    absentDays: 1,
    leaveDays: 0,
    totalHours: 176,
    overtimeHours: 8.5,
}

const attendanceRecords = [
    { date: "Dec 1", day: "Mon", status: "present", checkIn: "07:30 AM", checkOut: "04:00 PM", hours: 8, type: "regular" },
    { date: "Dec 2", day: "Tue", status: "present", checkIn: "08:55 AM", checkOut: "06:05 PM", hours: 8.2, type: "regular" },
    { date: "Dec 3", day: "Wed", status: "present", checkIn: "09:10 AM", checkOut: "04:00 PM", hours: 7.8, type: "regular" },
    { date: "Dec 4", day: "Thu", status: "present", checkIn: "07:30 AM", checkOut: "04:00 PM", hours: 8, type: "regular" },
    { date: "Dec 5", day: "Fri", status: "weekend", checkIn: "07:30 AM", checkOut: "07:00 PM", hours: 9, type: "overtime" },
    { date: "Dec 6", day: "Sat", status: "weekend", checkIn: "-", checkOut: "-", hours: 0, type: "weekend" },
    { date: "Dec 7", day: "Sun", status: "present", checkIn: "-", checkOut: "-", hours: 0, type: "weekend" },
    { date: "Dec 8", day: "Mon", status: "present", checkIn: "07:30 AM", checkOut: "04:00 PM", hours: 8, type: "regular" },
    { date: "Dec 9", day: "Tue", status: "present", checkIn: "08:50 AM", checkOut: "04:00 PM", hours: 8.2, type: "regular" },
    { date: "Dec 10", day: "Wed", status: "present", checkIn: "07:30 AM", checkOut: "04:00 PM", hours: 8, type: "regular" },
    { date: "Dec 11", day: "Thu", status: "present", checkIn: "07:30 AM", checkOut: "04:00 PM", hours: 8, type: "regular" },
    { date: "Dec 12", day: "Fri", status: "weekend", checkIn: "07:30 AM", checkOut: "06:30 PM", hours: 8.5, type: "regular" },
    { date: "Dec 13", day: "Sat", status: "weekend", checkIn: "-", checkOut: "-", hours: 0, type: "weekend" },
    { date: "Dec 14", day: "Sun", status: "present", checkIn: "-", checkOut: "-", hours: 0, type: "weekend" },
    { date: "Dec 15", day: "Mon", status: "present", checkIn: "07:30 AM", checkOut: "04:00 PM", hours: 8, type: "regular" },
    { date: "Dec 16", day: "Tue", status: "present", checkIn: "09:05 AM", checkOut: "05:55 PM", hours: 7.8, type: "regular" },
    { date: "Dec 17", day: "Wed", status: "present", checkIn: "07:30 AM", checkOut: "04:00 PM", hours: 8, type: "regular" },
    { date: "Dec 18", day: "Thu", status: "present", checkIn: "07:30 AM", checkOut: "06:30 PM", hours: 8.5, type: "regular" },
    { date: "Dec 19", day: "Fri", status: "weekend", checkIn: "07:30 AM", checkOut: "04:00 PM", hours: 8, type: "regular" },
    { date: "Dec 20", day: "Sat", status: "weekend", checkIn: "-", checkOut: "-", hours: 0, type: "weekend" },
    { date: "Dec 21", day: "Sun", status: "present", checkIn: "-", checkOut: "-", hours: 0, type: "weekend" },
    { date: "Dec 22", day: "Mon", status: "absent", checkIn: "-", checkOut: "-", hours: 0, type: "absent" },
    { date: "Dec 23", day: "Tue", status: "present", checkIn: "07:30 AM", checkOut: "04:00 PM", hours: 8, type: "regular" },
]

export default function Attendance() {
    const [selectedMonth, setSelectedMonth] = useState("2025-12")

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "present":
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">Present</Badge>
            case "absent":
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">Absent</Badge>
            case "weekend":
                return <Badge variant="outline" className="bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400">Weekend</Badge>
            case "leave":
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">Leave</Badge>
            default:
                return null
        }
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="flex items-center justify-between px-4 lg:px-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
                            <p className="text-muted-foreground">Track your attendance and working hours</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon">
                                <IconChevronLeft className="size-4" />
                            </Button>
                            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2025-12">December 2025</SelectItem>
                                    <SelectItem value="2025-11">November 2025</SelectItem>
                                    <SelectItem value="2025-10">October 2025</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon">
                                <IconChevronRight className="size-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @3xl/main:grid-cols-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Present Days</CardDescription>
                                <CardTitle className="text-3xl font-bold">{monthlyData.presentDays}/{monthlyData.totalDays}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <IconCalendarCheck className="size-4 text-green-600" />
                                    <span>95.7% Attendance</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Absent Days</CardDescription>
                                <CardTitle className="text-3xl font-bold">{monthlyData.absentDays}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <IconCalendarX className="size-4 text-red-600" />
                                    <span>Unauthorized</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Total Hours</CardDescription>
                                <CardTitle className="text-3xl font-bold">{monthlyData.totalHours}h</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <IconClock className="size-4 text-purple-600" />
                                    <span>Expected: 180h</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Overtime</CardDescription>
                                <CardTitle className="text-3xl font-bold">{monthlyData.overtimeHours}h</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <IconClock className="size-4 text-amber-600" />
                                    <span>2 days</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="px-4 lg:px-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Attendance Records</CardTitle>
                                <CardDescription>Daily attendance details for {monthlyData.month}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-auto rounded-lg border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Day</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>
                                                    <div className="flex items-center gap-2">
                                                        <IconClockHour9 className="size-4" />
                                                        Check In
                                                    </div>
                                                </TableHead>
                                                <TableHead>
                                                    <div className="flex items-center gap-2">
                                                        <IconClockHour5 className="size-4" />
                                                        Check Out
                                                    </div>
                                                </TableHead>
                                                <TableHead className="text-right">Hours</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {attendanceRecords.map((record, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{record.date}</TableCell>
                                                    <TableCell>{record.day}</TableCell>
                                                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                                                    <TableCell>{record.checkIn}</TableCell>
                                                    <TableCell>{record.checkOut}</TableCell>
                                                    <TableCell className="text-right">
                                                        {record.hours > 0 ? (
                                                            <span className={record.type === "overtime" ? "text-amber-600 font-semibold" : ""}>
                                                                {record.hours}h
                                                            </span>
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
