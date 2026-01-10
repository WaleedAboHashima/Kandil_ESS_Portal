import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconTrash, IconCalendar, IconClock } from "@tabler/icons-react";
import { useUserLeaves, useDeleteLeave } from "@/queries/leaves";
import { format, parseISO } from "date-fns";
import type { LeaveRequest } from "@/types/leaves";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function LeaveRequestsTable() {
    const { data: userLeavesData, isLoading } = useUserLeaves();
    const deleteLeave = useDeleteLeave();

    // Safe date formatting helper
    const safeFormatDate = (dateString: string, formatStr: string = "MMM d, yyyy"): string => {
        try {
            if (!dateString || typeof dateString !== 'string') {
                return "Invalid date";
            }
            const parsed = parseISO(dateString);
            if (isNaN(parsed.getTime())) {
                return "Invalid date";
            }
            return format(parsed, formatStr);
        } catch (error) {
            console.error('Error formatting date:', dateString, error);
            return "Invalid date";
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "approved":
                return (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                        Approved
                    </Badge>
                );
            case "to approve":
                return (
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
                        Pending
                    </Badge>
                );
            case "refused":
                return (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                        Refused
                    </Badge>
                );
            case "to submit":
                return (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
                        Draft
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const handleDelete = (leaveId: number) => {
        deleteLeave.mutate({ leave_id: leaveId });
    };

    // Flatten all leave requests from all categories with defensive validation
    const allLeaveRequests: LeaveRequest[] = [];
    if (userLeavesData && typeof userLeavesData === 'object') {
        try {
            Object.values(userLeavesData).forEach((categories) => {
                // Ensure categories is an array
                if (Array.isArray(categories)) {
                    categories.forEach((category) => {
                        // Ensure category is an object with a data property that is an array
                        if (category && typeof category === 'object' && 'data' in category && Array.isArray(category.data)) {
                            allLeaveRequests.push(...category.data);
                        } else {
                            console.warn('Invalid category structure:', category);
                        }
                    });
                } else {
                    console.warn('Invalid categories structure (not an array):', categories);
                }
            });
        } catch (error) {
            console.error('Error flattening leave requests:', error);
        }
    }

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>My Leave Requests</CardTitle>
                    <CardDescription>View and manage your time off requests</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8 text-muted-foreground">
                        Loading leave requests...
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Leave Requests</CardTitle>
                <CardDescription>View and manage your time off requests</CardDescription>
            </CardHeader>
            <CardContent>
                {allLeaveRequests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                        <IconCalendar className="size-12 mb-4 opacity-50" />
                        <p>No leave requests found</p>
                        <p className="text-sm">Submit a new request to get started</p>
                    </div>
                ) : (
                    <div className="overflow-auto rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Period</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allLeaveRequests.map((request) => {
                                    const isHourBased = request.request_unit.toLowerCase() === "hours" || request.request_unit.toLowerCase() === "hour";

                                    return (
                                        <TableRow key={request.leave_id}>
                                            <TableCell className="font-medium">{request.leave_type_name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1.5">
                                                    {isHourBased ? (
                                                        <>
                                                            <IconClock className="size-4 text-muted-foreground" />
                                                            <span className="text-sm">
                                                                {safeFormatDate(request.date_from, "MMM d, yyyy")}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IconCalendar className="size-4 text-muted-foreground" />
                                                            <span className="text-sm">
                                                                {safeFormatDate(request.date_from, "MMM d")} -{" "}
                                                                {safeFormatDate(request.date_to, "MMM d, yyyy")}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {isHourBased ? (
                                                    <span className="text-sm">
                                                        {request.hour_from}h - {request.hour_to}h
                                                    </span>
                                                ) : (
                                                    <span className="text-sm">{request.duration_days}</span>
                                                )}
                                            </TableCell>
                                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                <span className="text-sm text-muted-foreground">
                                                    {request.description || "-"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <IconTrash className="size-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Leave Request</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete this leave request? This action
                                                                cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(request.leave_id)}
                                                                className="bg-red-600 hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
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
    );
}
