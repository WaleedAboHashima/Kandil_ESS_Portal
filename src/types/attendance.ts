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
