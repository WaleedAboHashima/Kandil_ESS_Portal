export interface AttendanceRecord {
    attendance_id: number;
    employee_id: number;
    employee_name: string;
    employee_tz: string;
    partner_id: number | false;
    partner_name: string | false;
    have_location: boolean;
    lat: string | number;
    long: string | number;
    location: string;
    check_in: string;
    check_in_lat: string;
    check_in_long: string;
    check_in_location: string;
    checkout_partner_id: number | false;
    checkout_partner_name: string | false;
    checkout_partner_have_location: boolean;
    checkout_partner_lat: string;
    checkout_partner_long: string;
    checkout_partner_location: string;
    check_out: string;
    check_out_lat: string;
    check_out_long: string;
    check_out_location: string;
}

export interface AttendanceResponse {
    jsonrpc: string;
    id: null;
    result: {
        Code: number;
        StatusDescription: string;
        Data: AttendanceRecord[];
        ArabicMessage: string;
        EnglishMessage: string;
    };
}

export interface AttendanceSummaryData {
    month: string;
    year: string;
    target_days: number;
    target: string;
    final_actual: string;
    overtime_totalday: number;
    attendance_days: number;
    absent_days: number;
    public_holidays: number;
    rest_days: number;
    half_day: number;
    missions: number;
    permission: number;
    continuous_request: number;
    no_of_months: number;
    number_of_fridays: number;
    number_of_public_holidays: number;
}

export interface AttendanceSummaryResponse {
    jsonrpc: string;
    id: null;
    result: {
        Code: number;
        StatusDescription: string;
        Data: {
            employee_ar_name: string;
            employee: string;
            code: string;
            "#_lines": number;
            data: AttendanceSummaryData[];
        };
        ArabicMessage: string;
        EnglishMessage: string;
    };
}

export interface AttendanceStatusData {
    day: string;
    date: string;
    in_time: string;
    out_time: string;
    shift_id: string;
    late_in: string;
    early_in: string;
    f_in_time: string;
    f_worked_hours: string;
    working_hours: string;
    worked_hours: string;
    overtime: string;
    f_overtime: string;
    details: string;
}

export interface AttendanceStatusResponse {
    jsonrpc: string;
    id: null;
    result: {
        Code: number;
        StatusDescription: string;
        Data: {
            employee_ar_name: string;
            employee: string;
            code: string;
            "#_lines": number;
            data: AttendanceStatusData[];
        };
        ArabicMessage: string;
        EnglishMessage: string;
    };
}
