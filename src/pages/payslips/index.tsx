import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { IconFileDownload, IconEye, IconCurrencyDollar } from "@tabler/icons-react"

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
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Current Payslip - {currentPayslip.month}</CardTitle>
                                        <CardDescription>Detailed salary breakdown</CardDescription>
                                    </div>
                                    <Button className="gap-2">
                                        <IconFileDownload className="size-4" />
                                        Download PDF
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-muted-foreground">Employee ID</div>
                                        <div className="font-medium">{currentPayslip.employeeId}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground">Employee Name</div>
                                        <div className="font-medium">{currentPayslip.employeeName}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground">Designation</div>
                                        <div className="font-medium">{currentPayslip.designation}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground">Department</div>
                                        <div className="font-medium">{currentPayslip.department}</div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 gap-6 @3xl/main:grid-cols-2">
                                    <div>
                                        <h3 className="font-semibold mb-4">Earnings</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Basic Salary</span>
                                                <span className="font-medium">EGP {currentPayslip.basicSalary.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">House Rent Allowance (HRA)</span>
                                                <span className="font-medium">EGP {currentPayslip.hra.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Transportation</span>
                                                <span className="font-medium">EGP {currentPayslip.transportation.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Medical Allowance</span>
                                                <span className="font-medium">EGP {currentPayslip.medical.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Performance Bonus</span>
                                                <span className="font-medium">EGP {currentPayslip.bonus.toLocaleString()}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between font-semibold text-green-600">
                                                <span>Total Earnings</span>
                                                <span>EGP {totalEarnings.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-4">Deductions</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Income Tax</span>
                                                <span className="font-medium">EGP {currentPayslip.tax.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Health Insurance</span>
                                                <span className="font-medium">EGP {currentPayslip.insurance.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Provident Fund (PF)</span>
                                                <span className="font-medium">EGP {currentPayslip.providentFund.toLocaleString()}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between font-semibold text-red-600">
                                                <span>Total Deductions</span>
                                                <span>EGP {totalDeductions.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="rounded-lg bg-muted p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold">Net Salary</span>
                                        <span className="text-2xl font-bold text-primary">EGP {netSalary.toLocaleString()}</span>
                                    </div>
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
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {payslipHistory.map((payslip) => (
                                                <TableRow key={payslip.id}>
                                                    <TableCell className="font-medium">{payslip.month}</TableCell>
                                                    <TableCell>EGP {payslip.netSalary.toLocaleString()}</TableCell>
                                                    <TableCell>{getStatusBadge(payslip.status)}</TableCell>
                                                    <TableCell>{payslip.date}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button variant="ghost" size="sm">
                                                                <IconEye className="size-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="sm">
                                                                <IconFileDownload className="size-4" />
                                                            </Button>
                                                        </div>
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
