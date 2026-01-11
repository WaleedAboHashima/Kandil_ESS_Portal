import { RecruitmentRequestsTable } from "@/components/recruitment/recruitment-requests-table";
import { CreateRecruitmentDialog } from "@/components/recruitment/create-recruitment-dialog";

export default function Recruitment() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="flex items-center justify-between px-4 lg:px-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Recruitment</h1>
                            <p className="text-muted-foreground">View and manage recruitment requests</p>
                        </div>
                        <CreateRecruitmentDialog />
                    </div>

                    <div className="px-4 lg:px-6">
                        <RecruitmentRequestsTable />
                    </div>
                </div>
            </div>
        </div>
    );
}
