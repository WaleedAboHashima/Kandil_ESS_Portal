import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { IconPlus, IconLoader2 } from "@tabler/icons-react";
import {
  useCreateRecruitmentRequest,
  useDepartments,
  useJobs,
} from "@/queries/recruitment";

export function CreateRecruitmentDialog() {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [jobId, setJobId] = useState<number | null>(null);
  const [expectedEmployees, setExpectedEmployees] = useState(1);
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [validationError, setValidationError] = useState<string>("");
  const [reason, setReason] = useState("");

  const { data: departments } = useDepartments();
  const { data: jobs } = useJobs();
  const createRequest = useCreateRecruitmentRequest();

  // Filter jobs by selected department
  const filteredJobs = useMemo(() => {
    if (!jobs || !departmentId) return [];
    return jobs.filter((job) => job.department_id === departmentId);
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
    const numEmployees = expectedEmployees;
    if (isNaN(numEmployees) || numEmployees < 1) {
      setValidationError("Expected employees must be at least 1");
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

    if (!reason.trim()) {
      setValidationError("Please provide reason");
      return;
    }

    const requestData = {
      subject,
      department_id: departmentId,
      job_id: jobId,
      reason,
      expected_employees: numEmployees,
      job_description: description,
      job_requirement: requirements,
    };

    createRequest.mutate(requestData, {
      onSuccess: () => {
        setSubject("");
        setDepartmentId(0);
        setJobId(0);
        setExpectedEmployees(1);
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
          <DialogDescription>
            Submit a new recruitment request. Fill in all required fields.
          </DialogDescription>
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
                  <SelectItem
                    key={dept.department_id}
                    value={dept.department_id.toString()}
                  >
                    {dept.department_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job">Job Position *</Label>
            <Select
              value={jobId?.toString()}
              onValueChange={(value) => setJobId(parseInt(value))}
              required
              disabled={!departmentId}
            >
              <SelectTrigger id="job">
                <SelectValue
                  placeholder={
                    !departmentId
                      ? "Select department first"
                      : "Select job position"
                  }
                />
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
              <p className="text-xs text-muted-foreground">
                No jobs available for this department.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="expected-employees">
              Expected Number of Employees *
            </Label>
            <Input
              id="expected-employees"
              type="number"
              min={1}
              value={expectedEmployees}
              onChange={(e) => setExpectedEmployees(parseInt(e.target.value))}
              required
            />
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

          <div className="space-y-2">
            <Label htmlFor="description">Request Reason *</Label>
            <Textarea
              id="description"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for request..."
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createRequest.isPending}>
              {createRequest.isPending && (
                <IconLoader2 className="size-4 animate-spin" />
              )}
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
