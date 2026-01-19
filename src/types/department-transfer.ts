export interface EmployeeInfo {
  id: number;
  name: string;
  department_id: string;
  department_name: string;
  job_id: string;
  job_name: string;
}

export interface GetEmployeeInfoResponse {
  jsonrpc: string;
  id: null;
  result: {
    Code: number;
    StatusDescription: string;
    Data: EmployeeInfo[];
  };
}

export type TransferType = "internal" | "acting" | "temporary";

export interface CreateDepartmentTransferRequest {
  employee_id: number;
  new_department_id: number;
  new_job_id: number;
  manager_note?: string;
  new_manager_note?: string;
  hr_note?: string;
  transfer_type: TransferType;
  start_date: string;
  end_date: string;
}

export interface CreateDepartmentTransferResponse {
  jsonrpc: string;
  id: null;
  result: {
    Code: number;
    StatusDescription: string;
    EnglishMessage: string;
    ArabicMessage: string;
  };
}

export interface DepartmentTransferRequest {
  id: number;
  name: string;
  employee_id: number;
  employee_name: string;
  from_department_id: number | false;
  from_department_name: string | false;
  from_job_id: number | false;
  from_job_name: string | false;
  to_department_id: number;
  to_department_name: string;
  to_job_id: number;
  to_job_name: string;
  state: string;
  manager_note: string;
  new_manager_note: string;
  hr_note: string;
}

export interface GetDepartmentTransferRequestsResponse {
  jsonrpc: string;
  id: null;
  result: {
    Code: number;
    StatusDescription: string;
    Data: DepartmentTransferRequest[];
  };
}

export interface DeleteDepartmentTransferRequest {
  transfer_id: number;
}

export interface DeleteDepartmentTransferResponse {
  jsonrpc: string;
  id: null;
  result: {
    Code: number;
    StatusDescription: string;
    EnglishMessage: string;
    ArabicMessage: string;
  };
}
