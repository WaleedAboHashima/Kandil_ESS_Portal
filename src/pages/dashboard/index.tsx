import { SectionCards } from "@/components/section-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconCalendarEvent, IconClockHour4 } from "@tabler/icons-react"
import { SiteHeader } from "@/components/site-header"

const recentActivities = [
    {
        id: 1,
        title: "Clock In",
        description: "Checked in at 09:00 AM",
        time: "Today, 09:00 AM",
        icon: IconClockHour4,
    },
    {
        id: 2,
        title: "Leave Request Approved",
        description: "Annual leave for Dec 25-27 has been approved",
        time: "Yesterday, 2:30 PM",
        icon: IconCalendarEvent,
    },
]

export default function Dashboard() {
    return (
        <>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
                <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
                    <SectionCards />
                </div>
            </div>
        </>
    )
}
