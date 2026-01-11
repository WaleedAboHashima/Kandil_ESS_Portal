import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IconBriefcase, IconCalendar, IconUser } from "@tabler/icons-react";
import { useRecruitmentRequests } from "@/queries/recruitment";
import { format, parseISO } from "date-fns";
import type { RecruitmentRequest } from "@/types/recruitment";

export function RecruitmentRequestsTable() {
    const { data: recruitmentRequests, isLoading } = useRecruitmentRequests();

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
            case "done":
                return (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                        Done
                    </Badge>
                );
            case "in_progress":
            case "in progress":
                return (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
                        In Progress
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
                return (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                        Cancelled
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const stripHtml = (html: string): string => {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recruitment Requests</CardTitle>
                    <CardDescription>View all recruitment requests</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8 text-muted-foreground">
                        Loading recruitment requests...
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recruitment Requests</CardTitle>
                <CardDescription>View all recruitment requests</CardDescription>
            </CardHeader>
            <CardContent>
                {!recruitmentRequests || recruitmentRequests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                        <IconBriefcase className="size-12 mb-4 opacity-50" />
                        <p>No recruitment requests found</p>
                    </div>
                ) : (
                    <div className="overflow-auto rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Request ID</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Job Position</TableHead>
                                    <TableHead>Positions</TableHead>
                                    <TableHead>Expected Date</TableHead>
                                    <TableHead>Requester</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recruitmentRequests.map((request: RecruitmentRequest, index: number) => (
                                    <TableRow key={`${request.rr_name}-${index}`}>
                                        <TableCell className="font-medium">{request.rr_name}</TableCell>
                                        <TableCell>{request.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5">
                                                <IconBriefcase className="size-4 text-muted-foreground" />
                                                <span className="text-sm">{request.department_id}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm">
                                                {request.existing_job === "Yes" ? request.job_id : request.job_tmp || "-"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-medium">{request.expected_employees}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5">
                                                <IconCalendar className="size-4 text-muted-foreground" />
                                                <span className="text-sm">
                                                    {safeFormatDate(request.date_expected)}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5">
                                                <IconUser className="size-4 text-muted-foreground" />
                                                <span className="text-sm">{request.user_id}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(request.state)}</TableCell>
                                        <TableCell className="max-w-xs truncate">
                                            <span className="text-sm text-muted-foreground" title={stripHtml(request.description)}>
                                                {stripHtml(request.description) || "-"}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
