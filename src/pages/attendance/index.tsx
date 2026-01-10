import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconCalendarCheck, IconCalendarX, IconClock, IconClockHour9, IconClockHour5, IconMapPin } from "@tabler/icons-react"
import { useMemo, useState } from "react"
import { useAttendance } from "@/queries/attendance"
import { format, parseISO, differenceInHours, differenceInMinutes, startOfMonth, endOfMonth, eachDayOfInterval, isFuture, isToday, getDay } from "date-fns"

// Custom weekend checker for Friday (5) and Saturday (6)
const isWeekend = (date: Date) => {
    const day = getDay(date) // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
    return day === 5 || day === 6 // Friday or Saturday
}

export default function Attendance() {
    const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "yyyy-MM"))
    const { data: attendanceRecords, isLoading, error } = useAttendance()

    // Calculate monthly statistics
    const monthlyStats = useMemo(() => {
        if (!attendanceRecords) return null

        const [year, month] = selectedMonth.split("-").map(Number)
        const monthStart = startOfMonth(new Date(year, month - 1))
        const monthEnd = endOfMonth(new Date(year, month - 1))

        // Filter records for selected month
        const monthRecords = attendanceRecords.filter((record) => {
            const checkInDate = parseISO(record.check_in)
            return checkInDate >= monthStart && checkInDate <= monthEnd
        })

        // Calculate total working hours
        let totalHours = 0
        let presentDays = 0

        monthRecords.forEach((record) => {
            // Check if both check_in and check_out exist and are not empty strings
            if (record.check_in && record.check_out && record.check_out.trim() !== "") {
                const checkIn = parseISO(record.check_in)
                const checkOut = parseISO(record.check_out)
                const hours = differenceInHours(checkOut, checkIn)
                const minutes = differenceInMinutes(checkOut, checkIn) % 60
                totalHours += hours + minutes / 60
                presentDays++
            } else if (record.check_in) {
                presentDays++
            }
        })

        // Calculate total days in month (excluding weekends and future days)
        const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
        const workingDays = allDays.filter((day) => !isWeekend(day) && !isFuture(day)).length

        // Calculate absent days (fixed off-by-one error)
        const absentDays = workingDays - presentDays

        return {
            month: format(monthStart, "MMMM yyyy"),
            totalDays: workingDays,
            presentDays,
            absentDays,
            totalHours: Math.round(totalHours * 10) / 10,
            attendancePercentage: workingDays > 0 ? ((presentDays / workingDays) * 100).toFixed(1) : "0.0",
        }
    }, [attendanceRecords, selectedMonth])

    // Generate full month calendar with all days
    const displayRecords = useMemo(() => {
        if (!attendanceRecords) return []

        const [year, month] = selectedMonth.split("-").map(Number)
        const monthStart = startOfMonth(new Date(year, month - 1))
        const monthEnd = endOfMonth(new Date(year, month - 1))

        // Get all days in the month
        const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

        // Create a map of attendance records by date
        const recordsByDate = new Map()
        attendanceRecords.forEach((record) => {
            const checkInDate = parseISO(record.check_in)
            if (checkInDate >= monthStart && checkInDate <= monthEnd) {
                const dateKey = format(checkInDate, "yyyy-MM-dd")
                // If multiple records for same day, keep the one with more hours or the latest
                const existing = recordsByDate.get(dateKey)
                if (!existing) {
                    recordsByDate.set(dateKey, record)
                } else {
                    // Calculate hours for both records
                    const getHours = (rec: typeof record) => {
                        if (rec.check_in && rec.check_out && rec.check_out.trim() !== "") {
                            const checkIn = parseISO(rec.check_in)
                            const checkOut = parseISO(rec.check_out)
                            return differenceInMinutes(checkOut, checkIn)
                        }
                        return 0
                    }
                    const existingHours = getHours(existing)
                    const currentHours = getHours(record)

                    // Keep the record with more hours, or if equal, keep the latest by attendance_id
                    if (currentHours > existingHours || (currentHours === existingHours && record.attendance_id > existing.attendance_id)) {
                        recordsByDate.set(dateKey, record)
                    }
                }
            }
        })

        // Map each day to a display record
        return allDays.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd")
            const record = recordsByDate.get(dateKey)
            const isFutureDay = isFuture(day) && !isToday(day)

            if (record) {
                // Day has attendance record
                const checkInDate = parseISO(record.check_in)
                // Check if check_out exists and is not an empty string
                const checkOutDate = (record.check_out && record.check_out.trim() !== "") ? parseISO(record.check_out) : null

                let hours = 0
                if (checkOutDate) {
                    const totalMinutes = differenceInMinutes(checkOutDate, checkInDate)
                    hours = Math.round((totalMinutes / 60) * 10) / 10
                }

                return {
                    id: record.attendance_id,
                    date: format(day, "MMM d"),
                    fullDate: day,
                    day: format(day, "EEE"),
                    status: checkOutDate ? "present" : "incomplete",
                    checkIn: format(checkInDate, "hh:mm a"),
                    checkOut: checkOutDate ? format(checkOutDate, "hh:mm a") : "-",
                    hours,
                    location: (typeof record.partner_name === 'string' && record.partner_name) ? record.partner_name : "-",
                    hasLocation: record.have_location,
                    isFuture: false,
                    isWeekend: isWeekend(day),
                }
            } else if (isFutureDay) {
                // Future day - not yet happened
                return {
                    id: `future-${dateKey}`,
                    date: format(day, "MMM d"),
                    fullDate: day,
                    day: format(day, "EEE"),
                    status: "future",
                    checkIn: "-",
                    checkOut: "-",
                    hours: 0,
                    location: "-",
                    hasLocation: false,
                    isFuture: true,
                    isWeekend: isWeekend(day),
                }
            } else if (isWeekend(day)) {
                // Weekend
                return {
                    id: `weekend-${dateKey}`,
                    date: format(day, "MMM d"),
                    fullDate: day,
                    day: format(day, "EEE"),
                    status: "weekend",
                    checkIn: "-",
                    checkOut: "-",
                    hours: 0,
                    location: "-",
                    hasLocation: false,
                    isFuture: false,
                    isWeekend: true,
                }
            } else {
                // Past working day with no record = absent
                return {
                    id: `absent-${dateKey}`,
                    date: format(day, "MMM d"),
                    fullDate: day,
                    day: format(day, "EEE"),
                    status: "absent",
                    checkIn: "-",
                    checkOut: "-",
                    hours: 0,
                    location: "-",
                    hasLocation: false,
                    isFuture: false,
                    isWeekend: false,
                }
            }
        })
    }, [attendanceRecords, selectedMonth])

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "present":
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">Complete</Badge>
            case "incomplete":
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">In Progress</Badge>
            case "absent":
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">Absent</Badge>
            case "weekend":
                return <Badge variant="outline" className="bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400">Weekend</Badge>
            case "future":
                return <Badge variant="outline" className="bg-slate-50 text-slate-400 hover:bg-slate-50 dark:bg-slate-900/20 dark:text-slate-500">Not Yet</Badge>
            default:
                return null
        }
    }

    if (error) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-red-600">Error Loading Attendance</CardTitle>
                        <CardDescription>Failed to fetch attendance records. Please try again later.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
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
                            <div className="text-muted-foreground">Loading attendance records...</div>
                        </div>
                    ) : monthlyStats ? (
                        <>
                            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-3">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardDescription>Present Days</CardDescription>
                                        <CardTitle className="text-3xl font-bold">
                                            {monthlyStats.presentDays}/{monthlyStats.totalDays}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <IconCalendarCheck className="size-4 text-green-600" />
                                            <span>{monthlyStats.attendancePercentage}% Attendance</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardDescription>Absent Days</CardDescription>
                                        <CardTitle className="text-3xl font-bold">{monthlyStats.absentDays}</CardTitle>
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
                                        <CardTitle className="text-3xl font-bold">{monthlyStats.totalHours}h</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <IconClock className="size-4 text-purple-600" />
                                            <span>Expected: {monthlyStats.totalDays * 8}h</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="px-4 lg:px-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Attendance Records</CardTitle>
                                        <CardDescription>Daily attendance details for {monthlyStats.month}</CardDescription>
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
                                                        <TableHead>Location</TableHead>
                                                        <TableHead className="text-right">Hours</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {displayRecords.map((record) => (
                                                        <TableRow
                                                            key={record.id}
                                                            className={record.isFuture ? "opacity-40 pointer-events-none" : ""}
                                                        >
                                                            <TableCell className={`font-medium ${record.isFuture ? "text-muted-foreground" : ""}`}>
                                                                {record.date}
                                                            </TableCell>
                                                            <TableCell className={record.isFuture ? "text-muted-foreground" : ""}>
                                                                {record.day}
                                                            </TableCell>
                                                            <TableCell>{getStatusBadge(record.status)}</TableCell>
                                                            <TableCell className={record.isFuture ? "text-muted-foreground" : ""}>
                                                                {record.checkIn}
                                                            </TableCell>
                                                            <TableCell className={record.isFuture ? "text-muted-foreground" : ""}>
                                                                {record.checkOut}
                                                            </TableCell>
                                                            <TableCell>
                                                                {record.hasLocation ? (
                                                                    <div className="flex items-center gap-1 text-sm">
                                                                        <IconMapPin className="size-3 text-blue-600" />
                                                                        <span>{record.location}</span>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-muted-foreground">-</span>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                {record.hours > 0 ? (
                                                                    <span className={`${record.hours > 8 ? "text-amber-600 font-semibold" : ""} ${record.isFuture ? "text-muted-foreground" : ""}`}>
                                                                        {record.hours}h
                                                                    </span>
                                                                ) : (
                                                                    <span className={record.isFuture ? "text-muted-foreground" : ""}>-</span>
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
                        </>
                    ) : (
                        <div className="py-12 text-center text-muted-foreground">No data available</div>
                    )}
                </div>
            </div>
        </div>
    )
}
