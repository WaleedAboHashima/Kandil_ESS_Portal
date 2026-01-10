export interface LeaveType {
    leave_type_id: number;
    leave_type_name: string;
    request_unit: string;
    count_all: number;
    count_tosubmit: number;
    count_toapprove: number;
    count_secondapprove: number;
    count_approved: number;
    count_refused: number;
}

export interface LeaveTypeData {
    LeavesType: LeaveType[];
    LeavesBalance: Record<string, string>;
}

export interface LeaveTypeResponse {
    jsonrpc: string;
    id: null;
    result: {
        Code: number;
        StatusDescription: string;
        Data: LeaveTypeData;
        ArabicMessage: string;
        EnglishMessage: string;
    };
}

export interface LeaveRequest {
    leave_type_id: number;
    leave_type_name: string;
    leave_id: number;
    employee_id: number;
    employee_name: string;
    request_unit: string;
    date_from: string;
    date_to: string;
    hour_from: number;
    hour_to: number;
    duration_days: string;
    duration_hours: number;
    status: string;
    name: string;
    description: string;
    notification_list: any[];
}

export interface LeaveCategory {
    leave_type_id: number;
    leave_type_name: string;
    request_unit: string;
    count_all: number;
    count_tosubmit: number;
    count_toapprove: number;
    count_secondapprove: number;
    count_approved: number;
    count_refused: number;
    data: LeaveRequest[];
}

export interface UserLeavesData {
    [key: string]: LeaveCategory[];
}

export interface UserLeavesResponse {
    jsonrpc: string;
    id: null;
    result: {
        Code: number;
        StatusDescription: string;
        Data: UserLeavesData;
        ArabicMessage: string;
        EnglishMessage: string;
    };
}

export interface CreateLeaveRequest {
    leave_type_id: number;
    request_date_from: string;
    from: string;
    to: string;
    description: string;
}

export interface CreateLeaveResponse {
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

export interface DeleteLeaveRequest {
    leave_id: number;
}

export interface DeleteLeaveResponse {
    jsonrpc: string;
    id: null;
    result: {
        Code: number;
        StatusDescription: string;
        Data: any;
        ArabicMessage: string;
        EnglishMessage: string;
    };
}
