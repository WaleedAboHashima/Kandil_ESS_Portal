import { useState, useMemo, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IconPlus, IconLoader2, IconCalendar } from "@tabler/icons-react";
import { useCreateLeave, useLeaveTypes, useUserLeaves } from "@/queries/leaves";
import { format, parseISO, eachDayOfInterval } from "date-fns";
import { cn } from "@/lib/utils";
import type { LeaveType } from "@/types/leaves";

interface RequestLeaveDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    preselectedDate?: Date;
}

export function RequestLeaveDialog({ open: controlledOpen, onOpenChange, preselectedDate }: RequestLeaveDialogProps = {}) {
    const [internalOpen, setInternalOpen] = useState(false);
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setOpen = onOpenChange || setInternalOpen;
    const [selectedLeaveType, setSelectedLeaveType] = useState<LeaveType | null>(null);
    const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
    const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
    const [hourFrom, setHourFrom] = useState("");
    const [hourTo, setHourTo] = useState("");
    const [description, setDescription] = useState("");
    const [validationError, setValidationError] = useState<string>("");

    const { data: leaveTypesData } = useLeaveTypes();
    const { data: userLeavesData } = useUserLeaves();
    const createLeave = useCreateLeave();

    // Set preselected date when dialog opens
    useEffect(() => {
        if (preselectedDate && open) {
            setDateFrom(preselectedDate);
            setDateTo(preselectedDate);
        }
    }, [preselectedDate, open]);

    // Get all dates that have existing leave requests
    const bookedDates = useMemo(() => {
        if (!userLeavesData) return new Set<string>();

        const dates = new Set<string>();

        // Iterate through all leave categories
        Object.values(userLeavesData).forEach((categories) => {
            categories.forEach((category) => {
                category.data.forEach((leave) => {
                    // Only consider approved or pending leaves (not refused)
                    if (leave.status !== 'refused') {
                        const startDate = parseISO(leave.date_from);
                        const endDate = parseISO(leave.date_to);

                        // Add all dates in the range
                        const datesInRange = eachDayOfInterval({ start: startDate, end: endDate });
                        datesInRange.forEach((date) => {
                            dates.add(format(date, 'yyyy-MM-dd'));
                        });
                    }
                });
            });
        });

        return dates;
    }, [userLeavesData]);

    const handleLeaveTypeChange = (leaveTypeId: string) => {
        const leaveType = leaveTypesData?.LeavesType.find((lt) => lt.leave_type_id === Number(leaveTypeId));
        setSelectedLeaveType(leaveType || null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError("");

        // Validate required fields
        if (!selectedLeaveType) {
            setValidationError("Please select a leave type");
            return;
        }

        if (!dateFrom) {
            setValidationError("Please select a start date");
            return;
        }

        const isHourBased = selectedLeaveType.request_unit.toLowerCase() === "hour";

        // Additional validation for day-based leaves
        if (!isHourBased && !dateTo) {
            setValidationError("Please select an end date for day-based leave");
            return;
        }

        // Validate hour-based fields
        if (isHourBased) {
            if (!hourFrom || !hourTo) {
                setValidationError("Please enter both from and to hours");
                return;
            }
            const fromNum = parseFloat(hourFrom);
            const toNum = parseFloat(hourTo);
            if (isNaN(fromNum) || isNaN(toNum) || fromNum >= toNum) {
                setValidationError("Invalid hours: 'from' must be less than 'to'");
                return;
            }
        }

        if (!description.trim()) {
            setValidationError("Please provide a description");
            return;
        }

        const leaveData = {
            leave_type_id: selectedLeaveType.leave_type_id,
            request_date_from: format(dateFrom, "yyyy-MM-dd"),
            from: isHourBased ? hourFrom : format(dateFrom, "yyyy-MM-dd"),
            to: isHourBased ? hourTo : dateTo ? format(dateTo, "yyyy-MM-dd") : format(dateFrom, "yyyy-MM-dd"),
            description: description,
        };

        createLeave.mutate(leaveData, {
            onSuccess: () => {
                // Reset form
                setSelectedLeaveType(null);
                setDateFrom(undefined);
                setDateTo(undefined);
                setHourFrom("");
                setHourTo("");
                setDescription("");
                setValidationError("");
                setOpen(false);
            },
        });
    };

    const isHourBased = selectedLeaveType?.request_unit.toLowerCase() === "hour";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!preselectedDate && (
                <DialogTrigger asChild>
                    <Button>
                        <IconPlus className="size-4" />
                        Request Leave
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Request Time Off</DialogTitle>
                    <DialogDescription>Submit a new leave request. Fill in all required fields.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {validationError && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
                            {validationError}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="leave-type">Leave Type *</Label>
                        <Select
                            value={selectedLeaveType?.leave_type_id.toString()}
                            onValueChange={handleLeaveTypeChange}
                            required
                        >
                            <SelectTrigger id="leave-type">
                                <SelectValue placeholder="Select leave type" />
                            </SelectTrigger>
                            <SelectContent>
                                {leaveTypesData?.LeavesType.map((leaveType) => (
                                    <SelectItem key={leaveType.leave_type_id} value={leaveType.leave_type_id.toString()}>
                                        {leaveType.leave_type_name} ({leaveType.request_unit})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Request Date *</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !dateFrom && "text-muted-foreground"
                                    )}
                                >
                                    <IconCalendar className="mr-2 size-4" />
                                    {dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={dateFrom}
                                    onSelect={setDateFrom}
                                    initialFocus
                                    disabled={(date) => {
                                        const today = new Date(new Date().setHours(0, 0, 0, 0));
                                        const dateStr = format(date, 'yyyy-MM-dd');
                                        return date < today || bookedDates.has(dateStr);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <p className="text-xs text-muted-foreground">Disabled dates are already requested / Date must be greater than today</p>
                    </div>

                    {isHourBased ? (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hour-from">From (Hour) *</Label>
                                    <Input
                                        id="hour-from"
                                        type="number"
                                        step="0.5"
                                        min="0"
                                        max="24"
                                        value={hourFrom}
                                        onChange={(e) => setHourFrom(e.target.value)}
                                        placeholder="e.g., 2"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hour-to">To (Hour) *</Label>
                                    <Input
                                        id="hour-to"
                                        type="number"
                                        step="0.5"
                                        min="0"
                                        max="24"
                                        value={hourTo}
                                        onChange={(e) => setHourTo(e.target.value)}
                                        placeholder="e.g., 2.5"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-2">
                            <Label>End Date *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !dateTo && "text-muted-foreground"
                                        )}
                                    >
                                        <IconCalendar className="mr-2 size-4" />
                                        {dateTo ? format(dateTo, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={dateTo}
                                        onSelect={setDateTo}
                                        initialFocus
                                        disabled={(date) => {
                                            const today = new Date(new Date().setHours(0, 0, 0, 0));
                                            const dateStr = format(date, 'yyyy-MM-dd');

                                            // Disable if date is booked
                                            if (bookedDates.has(dateStr)) return true;

                                            // Disable if before start date or before today
                                            if (dateFrom) {
                                                return date < dateFrom || date < today;
                                            }
                                            return date < today;
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            <p className="text-xs text-muted-foreground">Disabled dates are already requested / Date must be greater than today</p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter reason for leave..."
                            rows={4}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={createLeave.isPending || !selectedLeaveType}>
                            {createLeave.isPending && <IconLoader2 className="size-4 animate-spin" />}
                            Submit Request
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
