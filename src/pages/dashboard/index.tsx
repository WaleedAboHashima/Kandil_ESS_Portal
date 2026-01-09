import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartBarLeaveTypes } from "@/components/chart-bar-leave-types"
import { ChartRadialAttendance } from "@/components/chart-radial-attendance"
import { ChartPieLeaveBreakdown } from "@/components/chart-pie-leave-breakdown"
import { SectionCards } from "@/components/section-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconCalendarEvent, IconClockHour4, IconFileText, IconUserCheck } from "@tabler/icons-react"
import { SiteHeader } from "@/components/site-header"
import { motion } from "motion/react"

const recentActivities = [
    {
        id: 1,
        title: "Clock In",
        description: "Checked in at 09:00 AM",
        time: "Today, 09:00 AM",
        icon: IconClockHour4,
        type: "attendance",
    },
    {
        id: 2,
        title: "Leave Request Approved",
        description: "Annual leave for Dec 25-27 has been approved",
        time: "Yesterday, 2:30 PM",
        icon: IconCalendarEvent,
        type: "leave",
    },
    {
        id: 3,
        title: "Timesheet Submitted",
        description: "Weekly timesheet submitted for review",
        time: "Dec 15, 5:00 PM",
        icon: IconFileText,
        type: "timesheet",
    },
    {
        id: 4,
        title: "Profile Updated",
        description: "Emergency contact information updated",
        time: "Dec 12, 11:30 AM",
        icon: IconUserCheck,
        type: "profile",
    },
]

const upcomingLeaves = [
    {
        id: 1,
        type: "Annual Leave",
        startDate: "Dec 25, 2024",
        endDate: "Dec 27, 2024",
        days: 3,
        status: "Approved",
    },
    {
        id: 2,
        type: "Sick Leave",
        startDate: "Dec 20, 2024",
        endDate: "Dec 20, 2024",
        days: 1,
        status: "Pending",
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
}

const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
}

const activityItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: index * 0.1,
            duration: 0.4,
            ease: "easeOut"
        }
    })
}

export default function Dashboard() {
    return (
        <>
            <SiteHeader />
            <motion.div
                className="flex flex-1 flex-col"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <motion.div variants={itemVariants}>
                            <SectionCards />
                        </motion.div>

                        <motion.div
                            className="px-4 lg:px-6"
                            variants={itemVariants}
                        >
                            <ChartAreaInteractive />
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 gap-4 px-4 lg:px-6 @3xl/main:grid-cols-3"
                            variants={itemVariants}
                        >
                            <motion.div variants={chartVariants}>
                                <ChartRadialAttendance />
                            </motion.div>
                            <motion.div variants={chartVariants}>
                                <ChartPieLeaveBreakdown />
                            </motion.div>
                            <motion.div variants={chartVariants}>
                                <ChartBarLeaveTypes />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 gap-4 px-4 lg:px-6 @3xl/main:grid-cols-2"
                            variants={itemVariants}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Activity</CardTitle>
                                        <CardDescription>Your latest ESS activities</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentActivities.map((activity, index) => (
                                                <motion.div
                                                    key={activity.id}
                                                    className="flex items-start gap-4"
                                                    custom={index}
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={activityItemVariants}
                                                    whileHover={{ x: 5 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
                                                        <activity.icon className="text-muted-foreground size-5" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <p className="text-sm font-medium leading-none">
                                                            {activity.title}
                                                        </p>
                                                        <p className="text-muted-foreground text-sm">
                                                            {activity.description}
                                                        </p>
                                                        <p className="text-muted-foreground text-xs">
                                                            {activity.time}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upcoming Leaves</CardTitle>
                                        <CardDescription>Your scheduled time off</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {upcomingLeaves.map((leave, index) => (
                                                <motion.div
                                                    key={leave.id}
                                                    className="flex items-start justify-between gap-4 rounded-lg border p-4"
                                                    custom={index}
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={activityItemVariants}
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium leading-none">
                                                            {leave.type}
                                                        </p>
                                                        <p className="text-muted-foreground text-sm">
                                                            {leave.startDate} - {leave.endDate}
                                                        </p>
                                                        <p className="text-muted-foreground text-xs">
                                                            {leave.days} {leave.days === 1 ? "day" : "days"}
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        variant={leave.status === "Approved" ? "default" : "secondary"}
                                                        className={
                                                            leave.status === "Approved"
                                                                ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                                                                : "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
                                                        }
                                                    >
                                                        {leave.status}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
