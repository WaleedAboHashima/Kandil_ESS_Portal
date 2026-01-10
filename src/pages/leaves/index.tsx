import { RequestLeaveDialog } from "@/components/leaves/request-leave-dialog";
import { LeaveRequestsTable } from "@/components/leaves/leave-requests-table";
import { LeaveTypesGrid } from "@/components/leaves/leave-types-grid";

export default function Leaves() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="flex items-center justify-between px-4 lg:px-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
                            <p className="text-muted-foreground">Manage your leave requests and balance</p>
                        </div>
                        <RequestLeaveDialog />
                    </div>

                    <div className="px-4 lg:px-6">
                        <LeaveTypesGrid />
                    </div>

                    <div className="px-4 lg:px-6">
                        <LeaveRequestsTable />
                    </div>
                </div>
            </div>
        </div>
    );
}
