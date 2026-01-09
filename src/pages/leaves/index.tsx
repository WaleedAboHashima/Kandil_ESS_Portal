import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IconPlus } from "@tabler/icons-react"

const monthlyData = {
    month: "December 2024",
    annualLeave: 8.5,
    sickLeave: 4,
    casualLeave: 2,
    usedLeave: 11.5,
    totalAllowance: 24,
}

const leaveHistory = [
    {
        id: 1,
        type: "Annual Leave",
        startDate: "Dec 25, 2024",
        endDate: "Dec 27, 2024",
        days: 3,
        status: "Approved",
        appliedOn: "Dec 1, 2024",
        approvedBy: "John Manager",
    },
    {
        id: 2,
        type: "Sick Leave",
        startDate: "Dec 20, 2024",
        endDate: "Dec 20, 2024",
        days: 1,
        status: "Pending",
        appliedOn: "Dec 18, 2024",
        approvedBy: "-",
    },
    {
        id: 3,
        type: "Annual Leave",
        startDate: "Nov 15, 2024",
        endDate: "Nov 17, 2024",
        days: 3,
        status: "Approved",
        appliedOn: "Nov 1, 2024",
        approvedBy: "John Manager",
    },
    {
        id: 4,
        type: "Sick Leave",
        startDate: "Nov 8, 2024",
        endDate: "Nov 8, 2024",
        days: 1,
        status: "Approved",
        appliedOn: "Nov 8, 2024",
        approvedBy: "John Manager",
    },
    {
        id: 5,
        type: "Annual Leave",
        startDate: "Oct 10, 2024",
        endDate: "Oct 12, 2024",
        days: 3,
        status: "Approved",
        appliedOn: "Sep 28, 2024",
        approvedBy: "John Manager",
    },
    {
        id: 6,
        type: "Casual Leave",
        startDate: "Oct 5, 2024",
        endDate: "Oct 5, 2024",
        days: 1,
        status: "Rejected",
        appliedOn: "Oct 4, 2024",
        approvedBy: "John Manager",
    },
]

export default function Leaves() {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Approved":
                return (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                        Approved
                    </Badge>
                )
            case "Pending":
                return (
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
                        Pending
                    </Badge>
                )
            case "Rejected":
                return (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                        Rejected
                    </Badge>
                )
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
                            <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
                            <p className="text-muted-foreground">Manage your leave requests and balance</p>
                        </div>
                        <Button className="gap-2">
                            <IconPlus className="size-4" />
                            Request Leave
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Annual Leave</CardDescription>
                                <CardTitle className="text-3xl font-bold">{monthlyData.annualLeave}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">Days Available</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Sick Leave</CardDescription>
                                <CardTitle className="text-3xl font-bold">{monthlyData.sickLeave}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">Days Available</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Used Leave</CardDescription>
                                <CardTitle className="text-3xl font-bold">{monthlyData.usedLeave}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">This Year</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Total Allowance</CardDescription>
                                <CardTitle className="text-3xl font-bold">{monthlyData.totalAllowance}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">Days Per Year</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="px-4 lg:px-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Leave History</CardTitle>
                                <CardDescription>Your leave requests and approvals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-auto rounded-lg border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Type</TableHead>
                                                <TableHead>From - To</TableHead>
                                                <TableHead>Days</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {leaveHistory.map((leave) => (
                                                <TableRow key={leave.id}>
                                                    <TableCell className="font-medium">{leave.type}</TableCell>
                                                    <TableCell>{leave.startDate} - {leave.endDate}</TableCell>
                                                    <TableCell>{leave.days} {leave.days === 1 ? "day" : "days"}</TableCell>
                                                    <TableCell>{getStatusBadge(leave.status)}</TableCell>
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
