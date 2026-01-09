import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IconCurrencyDollar } from "@tabler/icons-react"

const currentPayslip = {
    month: "December 2025",
    employeeId: "EMP-2025-001",
    employeeName: "Hossam El-Sharkawy",
    designation: "Manager",
    department: "Engineering",
    basicSalary: 5000,
    hra: 1500,
    transportation: 500,
    medical: 300,
    bonus: 1000,
    tax: 800,
    insurance: 200,
    providentFund: 500,
}

const payslipHistory = [
    { id: 1, month: "December 2025", netSalary: 6800, status: "Processed", date: "Dec 30, 2025" },
    { id: 2, month: "November 2025", netSalary: 6800, status: "Paid", date: "Nov 30, 2025" },
    { id: 3, month: "October 2025", netSalary: 6800, status: "Paid", date: "Oct 31, 2025" },
    { id: 4, month: "September 2025", netSalary: 6300, status: "Paid", date: "Sep 30, 2025" },
    { id: 5, month: "August 2025", netSalary: 6800, status: "Paid", date: "Aug 31, 2025" },
    { id: 6, month: "July 2025", netSalary: 6800, status: "Paid", date: "Jul 31, 2025" },
]

export default function Payslips() {
    const totalEarnings = currentPayslip.basicSalary + currentPayslip.hra + currentPayslip.transportation + currentPayslip.medical + currentPayslip.bonus
    const totalDeductions = currentPayslip.tax + currentPayslip.insurance + currentPayslip.providentFund
    const netSalary = totalEarnings - totalDeductions

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Paid":
                return (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                        Paid
                    </Badge>
                )
            case "Processed":
                return (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
                        Processed
                    </Badge>
                )
            case "Pending":
                return (
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
                        Pending
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
                            <h1 className="text-2xl font-bold tracking-tight">Payslips</h1>
                            <p className="text-muted-foreground">View and download your salary slips</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @3xl/main:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Gross Salary</CardDescription>
                                <CardTitle className="text-3xl font-bold">EGP {totalEarnings.toLocaleString()}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                    <IconCurrencyDollar className="size-4" />
                                    <span>This Month</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Total Deductions</CardDescription>
                                <CardTitle className="text-3xl font-bold">EGP {totalDeductions.toLocaleString()}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-sm text-red-600">
                                    <IconCurrencyDollar className="size-4" />
                                    <span>This Month</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardDescription>Net Salary</CardDescription>
                                <CardTitle className="text-3xl font-bold">EGP {netSalary.toLocaleString()}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-sm text-blue-600">
                                    <IconCurrencyDollar className="size-4" />
                                    <span>Take Home</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>


                    <div className="px-4 lg:px-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payslip History</CardTitle>
                                <CardDescription>Previous months salary records</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-auto rounded-lg border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Month</TableHead>
                                                <TableHead>Net Salary</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Payment Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {payslipHistory.map((payslip) => (
                                                <TableRow key={payslip.id}>
                                                    <TableCell className="font-medium">{payslip.month}</TableCell>
                                                    <TableCell>EGP {payslip.netSalary.toLocaleString()}</TableCell>
                                                    <TableCell>{getStatusBadge(payslip.status)}</TableCell>
                                                    <TableCell>{payslip.date}</TableCell>
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
