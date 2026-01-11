import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IconPlus, IconLoader2, IconCalendar } from "@tabler/icons-react";
import { useCreateRecruitmentRequest, useDepartments, useJobs } from "@/queries/recruitment";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function CreateRecruitmentDialog() {
    const [open, setOpen] = useState(false);
    const [subject, setSubject] = useState("");
    const [departmentId, setDepartmentId] = useState<number | null>(null);
    const [existingJob, setExistingJob] = useState<string>("Yes");
    const [jobId, setJobId] = useState<number | null>(null);
    const [jobTmp, setJobTmp] = useState("");
    const [expectedEmployees, setExpectedEmployees] = useState("1");
    const [dateExpected, setDateExpected] = useState<Date | undefined>(undefined);
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [validationError, setValidationError] = useState<string>("");

    const { data: departments } = useDepartments();
    const { data: jobs } = useJobs();
    const createRequest = useCreateRecruitmentRequest();

    // Filter jobs by selected department
    const filteredJobs = useMemo(() => {
        if (!jobs || !departmentId) return [];
        return jobs.filter(job => job.department_id === departmentId);
    }, [jobs, departmentId]);

    // Reset job selection when department changes
    const handleDepartmentChange = (value: string) => {
        setDepartmentId(parseInt(value));
        setJobId(null); // Reset job when department changes
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError("");

        if (!subject.trim()) {
            setValidationError("Please enter a subject");
            return;
        }

        if (!departmentId) {
            setValidationError("Please select a department");
            return;
        }

        if (existingJob === "Yes" && !jobId) {
            setValidationError("Please select a job position");
            return;
        }

        if (existingJob === "No" && !jobTmp.trim()) {
            setValidationError("Please enter a new job position name");
            return;
        }

        const numEmployees = parseInt(expectedEmployees);
        if (isNaN(numEmployees) || numEmployees < 1) {
            setValidationError("Expected employees must be at least 1");
            return;
        }

        if (!dateExpected) {
            setValidationError("Please select an expected date");
            return;
        }

        if (!description.trim()) {
            setValidationError("Please provide a description");
            return;
        }

        if (!requirements.trim()) {
            setValidationError("Please provide requirements");
            return;
        }

        const requestData = {
            name: subject,
            department_id: departmentId,
            existing_job: existingJob,
            ...(existingJob === "Yes" ? { job_id: jobId! } : { job_tmp: jobTmp }),
            expected_employees: numEmployees,
            date_expected: format(dateExpected, "yyyy-MM-dd"),
            description: description,
            requirements: requirements,
        };

        createRequest.mutate(requestData, {
            onSuccess: () => {
                setSubject("");
                setDepartmentId(null);
                setExistingJob("Yes");
                setJobId(null);
                setJobTmp("");
                setExpectedEmployees("1");
                setDateExpected(undefined);
                setDescription("");
                setRequirements("");
                setValidationError("");
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <IconPlus className="size-4" />
                    New Request
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Recruitment Request</DialogTitle>
                    <DialogDescription>Submit a new recruitment request. Fill in all required fields.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {validationError && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
                            {validationError}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter recruitment request subject"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="department">Department *</Label>
                        <Select
                            value={departmentId?.toString()}
                            onValueChange={handleDepartmentChange}
                            required
                        >
                            <SelectTrigger id="department">
                                <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments?.map((dept) => (
                                    <SelectItem key={dept.department_id} value={dept.department_id.toString()}>
                                        {dept.department_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Job Type *</Label>
                        <RadioGroup value={existingJob} onValueChange={setExistingJob}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="existing-yes" />
                                <Label htmlFor="existing-yes" className="font-normal cursor-pointer">Existing Job</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="existing-no" />
                                <Label htmlFor="existing-no" className="font-normal cursor-pointer">New Job Position</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {existingJob === "Yes" ? (
                        <div className="space-y-2">
                            <Label htmlFor="job">Job Position *</Label>
                            <Select
                                value={jobId?.toString()}
                                onValueChange={(value) => setJobId(parseInt(value))}
                                required
                                disabled={!departmentId}
                            >
                                <SelectTrigger id="job">
                                    <SelectValue placeholder={!departmentId ? "Select department first" : "Select job position"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {filteredJobs.length === 0 ? (
                                        <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                                            No jobs found for this department
                                        </div>
                                    ) : (
                                        filteredJobs.map((job) => (
                                            <SelectItem key={job.id} value={job.id.toString()}>
                                                {job.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            {departmentId && filteredJobs.length === 0 && (
                                <p className="text-xs text-muted-foreground">No jobs available for this department. Consider selecting "New Job Position".</p>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Label htmlFor="job-tmp">New Job Position Name *</Label>
                            <Input
                                id="job-tmp"
                                value={jobTmp}
                                onChange={(e) => setJobTmp(e.target.value)}
                                placeholder="Enter new job position name"
                                required
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="expected-employees">Expected Number of Employees *</Label>
                        <Input
                            id="expected-employees"
                            type="number"
                            min="1"
                            value={expectedEmployees}
                            onChange={(e) => setExpectedEmployees(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Expected Date *</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !dateExpected && "text-muted-foreground"
                                    )}
                                >
                                    <IconCalendar className="mr-2 size-4" />
                                    {dateExpected ? format(dateExpected, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={dateExpected}
                                    onSelect={setDateExpected}
                                    initialFocus
                                    disabled={(date) => {
                                        const today = new Date(new Date().setHours(0, 0, 0, 0));
                                        return date < today;
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Job Description *</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter job description..."
                            rows={4}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="requirements">Job Requirements *</Label>
                        <Textarea
                            id="requirements"
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            placeholder="Enter job requirements..."
                            rows={4}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={createRequest.isPending}>
                            {createRequest.isPending && <IconLoader2 className="size-4 animate-spin" />}
                            Submit Request
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
