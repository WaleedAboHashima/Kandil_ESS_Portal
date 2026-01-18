import { EmployeeTransferTable } from "@/components/department-transfer/employee-transfer-table";
import { CreateTransferDialog } from "@/components/department-transfer/create-transfer-dialog";

export default function DepartmentTransfer() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="flex items-center justify-between px-4 lg:px-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Department Transfer</h1>
                            <p className="text-muted-foreground">Transfer employees to different departments and jobs</p>
                        </div>
                        <CreateTransferDialog />
                    </div>

                    <div className="px-4 lg:px-6">
                        <EmployeeTransferTable />
                    </div>
                </div>
            </div>
        </div>
    );
}
