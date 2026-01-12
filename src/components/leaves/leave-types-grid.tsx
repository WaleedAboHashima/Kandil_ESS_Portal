import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconClock,
  IconCalendar,
  IconCheck,
  IconHourglass,
  IconX,
} from "@tabler/icons-react";
import { useLeaveTypes } from "@/queries/leaves";
import { cn } from "@/lib/utils";

export function LeaveTypesGrid() {
  const { data: leaveTypesData, isLoading } = useLeaveTypes();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-20 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {leaveTypesData?.LeavesType.map((leaveType) => {
          const isHourBased = leaveType.request_unit.toLowerCase() === "hour";
          return (
            <Card
              key={leaveType.leave_type_id}
              className="relative overflow-hidden group hover:shadow-lg transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary"
            >
              <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 rounded-full opacity-10 bg-linear-to-br from-primary to-primary/50" />
              <CardHeader className="pb-3 relative">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={cn(
                      "p-1.5 rounded-md",
                      isHourBased
                        ? "bg-purple-100 dark:bg-purple-900/30"
                        : "bg-blue-100 dark:bg-blue-900/30"
                    )}
                  >
                    {isHourBased ? (
                      <IconClock className="size-3.5 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <IconCalendar className="size-3.5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-5"
                  >
                    {leaveType.request_unit}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold leading-tight font-almarai">
                  {leaveType.leave_type_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4 relative">
                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold tracking-tight">
                      {leaveType.count_all}
                    </span>
                    <span className="text-xs text-muted-foreground">total</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                    <div className="flex flex-col items-center gap-1 p-1.5 rounded-md bg-green-50 dark:bg-green-900/10">
                      <IconCheck className="size-3 text-green-600 dark:text-green-400" />
                      <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                        {leaveType.count_approved}
                      </span>
                      <span className="text-[9px] text-green-600/70 dark:text-green-400/70">
                        Approved
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-1.5 rounded-md bg-amber-50 dark:bg-amber-900/10">
                      <IconHourglass className="size-3 text-amber-600 dark:text-amber-400" />
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                        {leaveType.count_toapprove}
                      </span>
                      <span className="text-[9px] text-amber-600/70 dark:text-amber-400/70">
                        Pending
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-1.5 rounded-md bg-red-50 dark:bg-red-900/10">
                      <IconX className="size-3 text-red-600 dark:text-red-400" />
                      <span className="text-xs font-semibold text-red-700 dark:text-red-400">
                        {leaveType.count_refused}
                      </span>
                      <span className="text-[9px] text-red-600/70 dark:text-red-400/70">
                        Refused
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Leave Balance Cards - Show only Paid Time Off */}
      {leaveTypesData?.LeavesBalance &&
        Object.keys(leaveTypesData.LeavesBalance).length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 mt-4">
            {Object.entries(leaveTypesData.LeavesBalance)
              .filter(([leaveType]) => leaveType === "Paid Time Off")
              .map(([leaveType, balance]) => (
                <Card
                  key={leaveType}
                  className="relative overflow-hidden border-2 border-dashed border-primary/40 bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 hover:shadow-lg transition-all duration-200"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-primary/10" />
                  <CardHeader className="pb-2 relative">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 rounded-md bg-primary/20">
                        <IconCalendar className="size-3.5 text-primary" />
                      </div>
                    </div>
                    <CardDescription className="text-[10px] font-semibold uppercase tracking-wider">
                      Available Balance
                    </CardDescription>
                    <CardTitle className="text-sm font-semibold">
                      {leaveType}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4 relative">
                    <div className="text-3xl font-bold text-primary tracking-tight">
                      {balance}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      days remaining
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
    </>
  );
}
