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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { IconPlus, IconLoader2, IconCheck } from "@tabler/icons-react";
import {
  useCreateDepartmentTransfer,
  useEmployeeInfo,
} from "@/queries/department-transfer";
import { useDepartments, useJobs } from "@/queries/recruitment";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

export function CreateTransferDialog() {
  const [open, setOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [employeeSearchOpen, setEmployeeSearchOpen] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [newDepartmentId, setNewDepartmentId] = useState<number | null>(null);
  const [newJobId, setNewJobId] = useState<number | null>(null);
  const [managerNote, setManagerNote] = useState("");
  const [newManagerNote, setNewManagerNote] = useState("");
  const [hrNote, setHrNote] = useState("");
  const [validationError, setValidationError] = useState<string>("");

  const { data: employees } = useEmployeeInfo();
  const { data: departments } = useDepartments();
  const { data: jobs } = useJobs();
  const createTransfer = useCreateDepartmentTransfer();

  // Filter employees based on search
  const filteredEmployees = useMemo(() => {
    if (!employees) return [];
    if (!employeeSearch) return employees;

    const searchLower = employeeSearch.toLowerCase();
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchLower) ||
        emp.id.toString().includes(searchLower),
    );
  }, [employees, employeeSearch]);

  // Filter jobs by selected department
  const filteredJobs = useMemo(() => {
    if (!jobs || !newDepartmentId) return [];
    return jobs.filter((job) => job.department_id === newDepartmentId);
  }, [jobs, newDepartmentId]);

  // Get selected employee
  const selectedEmployee = useMemo(() => {
    return employees?.find((emp) => emp.id === employeeId);
  }, [employees, employeeId]);

  // Reset job selection when department changes
  const handleDepartmentChange = (value: string) => {
    setNewDepartmentId(parseInt(value));
    setNewJobId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!employeeId) {
      setValidationError("Please select an employee");
      return;
    }

    if (!newDepartmentId) {
      setValidationError("Please select a new department");
      return;
    }

    if (!newJobId) {
      setValidationError("Please select a new job");
      return;
    }

    const transferData = {
      employee_id: employeeId,
      new_department_id: newDepartmentId,
      new_job_id: newJobId,
      manager_note: managerNote || undefined,
      new_manager_note: newManagerNote || undefined,
      hr_note: hrNote || undefined,
    };

    createTransfer.mutate(transferData, {
      onSuccess: () => {
        setEmployeeId(null);
        setEmployeeSearch("");
        setNewDepartmentId(null);
        setNewJobId(null);
        setManagerNote("");
        setNewManagerNote("");
        setHrNote("");
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
          New Transfer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Employee Transfer Request</DialogTitle>
          <DialogDescription>
            Transfer an employee to a different department and job position.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {validationError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
              {validationError}
            </div>
          )}

          <div className="space-y-2">
            <Label>Employee *</Label>
            <Popover
              open={employeeSearchOpen}
              onOpenChange={setEmployeeSearchOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={employeeSearchOpen}
                  className="w-full justify-between font-normal"
                >
                  {selectedEmployee ? (
                    <span className="truncate">
                      {selectedEmployee.name} (ID: {selectedEmployee.id})
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      Select employee...
                    </span>
                  )}
                  <ArrowUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <div className="p-2">
                  <Input
                    placeholder="Search employee..."
                    value={employeeSearch}
                    onChange={(e) => setEmployeeSearch(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredEmployees.length === 0 ? (
                    <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                      No employee found.
                    </div>
                  ) : (
                    filteredEmployees.map((emp) => (
                      <button
                        key={emp.id}
                        type="button"
                        onClick={() => {
                          setEmployeeId(emp.id);
                          setEmployeeSearchOpen(false);
                          setEmployeeSearch("");
                        }}
                        className={cn(
                          "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                          employeeId === emp.id && "bg-accent",
                        )}
                      >
                        <IconCheck
                          className={cn(
                            "mr-2 size-4",
                            employeeId === emp.id ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <div className="flex flex-col items-start flex-1 min-w-0">
                          <span className="truncate">{emp.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ID: {emp.id}{" "}
                            {emp.department_name && `• ${emp.department_name}`}
                          </span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-department">New Department *</Label>
            <Select
              value={newDepartmentId?.toString()}
              onValueChange={handleDepartmentChange}
              required
            >
              <SelectTrigger id="new-department">
                <SelectValue placeholder="Select new department" />
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
            <Label htmlFor="new-job">New Job Position *</Label>
            <Select
              value={newJobId?.toString()}
              onValueChange={(value) => setNewJobId(parseInt(value))}
              required
              disabled={!newDepartmentId}
            >
              <SelectTrigger id="new-job">
                <SelectValue
                  placeholder={
                    !newDepartmentId
                      ? "Select department first"
                      : "Select new job position"
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
            {newDepartmentId && filteredJobs.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No jobs available for this department.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="manager-note">Manager Note</Label>
            <Textarea
              id="manager-note"
              value={managerNote}
              onChange={(e) => setManagerNote(e.target.value)}
              placeholder="Enter manager note..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-manager-note">New Manager Note</Label>
            <Textarea
              id="new-manager-note"
              value={newManagerNote}
              onChange={(e) => setNewManagerNote(e.target.value)}
              placeholder="Enter new manager note..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hr-note">HR Note</Label>
            <Textarea
              id="hr-note"
              value={hrNote}
              onChange={(e) => setHrNote(e.target.value)}
              placeholder="Enter HR note..."
              rows={3}
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
            <Button type="submit" disabled={createTransfer.isPending}>
              {createTransfer.isPending && (
                <IconLoader2 className="size-4 animate-spin" />
              )}
              Submit Transfer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
