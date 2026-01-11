export interface RecruitmentRequest {
  rr_name: string;
  name: string;
  department_id: string;
  existing_job: string;
  job_id: string;
  job_tmp: string;
  expected_employees: number;
  date_expected: string;
  user_id: string;
  approver_id: string;
  description: string;
  requirements: string;
  state: string;
}

export interface RecruitmentRequestsResponse {
  jsonrpc: string;
  id: null;
  result: {
    Code: number;
    StatusDescription: string;
    Data: RecruitmentRequest[];
    ArabicMessage: string;
    EnglishMessage: string;
  };
}

export interface Department {
  department_id: number;
  department_name: string;
  employees_data: any[];
}

export interface DepartmentsResponse {
  jsonrpc: string;
  id: null;
  result: {
    Code: number;
    StatusDescription: string;
    Data: Department[];
    ArabicMessage: string;
    EnglishMessage: string;
  };
}

export interface Job {
  id: number;
  name: string;
  department_id: number | false;
  department_name: string | false;
}

export interface JobsResponse {
  jsonrpc: string;
  id: null;
  result: {
    Code: number;
    StatusDescription: string;
    Data: Job[];
    ArabicMessage: string;
    EnglishMessage: string;
  };
}

export interface CreateRecruitmentRequest {
  subject: string;
  department_id: number | null;
  job_id: number | null;
  reason: string;
  expected_employees: number | null;
  job_description: string;
  job_requirement: string;
}

export interface CreateRecruitmentResponse {
  jsonrpc: string;
  id: null;
  result: {
    Code: number;
    StatusDescription: string;
    Data: {
      ID: number;
    };
    ArabicMessage: string;
    EnglishMessage: string;
  };
}
