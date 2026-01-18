import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IconTransfer, IconUser, IconBriefcase, IconTrash } from "@tabler/icons-react";
import { useTransferRequests, useDeleteDepartmentTransfer } from "@/queries/department-transfer";
import type { DepartmentTransferRequest } from "@/types/department-transfer";

export function EmployeeTransferTable() {
    const { data: transferRequests, isLoading } = useTransferRequests();
    const deleteTransfer = useDeleteDepartmentTransfer();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [transferToDelete, setTransferToDelete] = useState<number | null>(null);

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "done":
            case "approved":
                return (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                        Approved
                    </Badge>
                );
            case "in_progress":
            case "in progress":
            case "pending":
                return (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
                        Pending
                    </Badge>
                );
            case "draft":
                return (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400">
                        Draft
                    </Badge>
                );
            case "cancel":
            case "cancelled":
            case "rejected":
                return (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                        Rejected
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const handleDeleteClick = (transferId: number) => {
        setTransferToDelete(transferId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (transferToDelete) {
            deleteTransfer.mutate(
                { transfer_id: transferToDelete },
                {
                    onSuccess: () => {
                        setDeleteDialogOpen(false);
                        setTransferToDelete(null);
                    },
                }
            );
        }
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Transfer Requests</CardTitle>
                    <CardDescription>View all department transfer requests</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8 text-muted-foreground">
                        Loading transfer requests...
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Transfer Requests</CardTitle>
                    <CardDescription>View all department transfer requests</CardDescription>
                </CardHeader>
                <CardContent>
                    {!transferRequests || transferRequests.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                            <IconTransfer className="size-12 mb-4 opacity-50" />
                            <p>No transfer requests found</p>
                        </div>
                    ) : (
                        <div className="overflow-auto rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Request ID</TableHead>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>From Department</TableHead>
                                        <TableHead>To Department</TableHead>
                                        <TableHead>From Job</TableHead>
                                        <TableHead>To Job</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Manager Note</TableHead>
                                        <TableHead>New Manager Note</TableHead>
                                        <TableHead>HR Note</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transferRequests.map((request: DepartmentTransferRequest) => (
                                        <TableRow key={request.id}>
                                            <TableCell className="font-medium">
                                                {request.name || request.id}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1.5">
                                                    <IconUser className="size-4 text-muted-foreground" />
                                                    <span className="text-sm">
                                                        {request.employee_name || `Employee #${request.employee_id}`}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1.5">
                                                    <IconBriefcase className="size-4 text-muted-foreground" />
                                                    <span className="text-sm">
                                                        {request.from_department_name !== false
                                                            ? request.from_department_name
                                                            : "-"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1.5">
                                                    <IconBriefcase className="size-4 text-green-600 dark:text-green-400" />
                                                    <span className="text-sm font-medium">
                                                        {request.to_department_name || "-"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm">
                                                    {request.from_job_name !== false
                                                        ? request.from_job_name
                                                        : "-"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm font-medium">
                                                    {request.to_job_name || "-"}
                                                </span>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(request.state)}</TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                <span className="text-sm text-muted-foreground" title={request.manager_note}>
                                                    {request.manager_note || "-"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                <span className="text-sm text-muted-foreground" title={request.new_manager_note}>
                                                    {request.new_manager_note || "-"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                <span className="text-sm text-muted-foreground" title={request.hr_note}>
                                                    {request.hr_note || "-"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteClick(request.id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
                                                >
                                                    <IconTrash className="size-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Transfer Request</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this transfer request? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setTransferToDelete(null)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
