export interface User {
    employee_name: string;
    employee_pin: string;
    img_link: string;
    job_title: string;
    job_position: string;
    mobile: string;
    phone: string;
    email: string;
    department: string;
    manager: string;
    coach: string;
    company: string;
    approver_Expense: string;
    approver_Time_off: string;
    approver_Timesheet: string;
    tz?: string;
}

export interface AuthCallBack {
    result: {
        Code: number;
        mobile_lang: string;
        mobile_lang_code: string;
        token: string;
        company_id: number;
        company_name: string;
        currency_id: number;
        currency_name: string;
        context: {
            lang: string;
            tz: string;
            uid: number;
        };
        db: string;
        debug: string;
        login: string;
        uid: number;
        session_token: string;
        profile_session: string;
        profile_collectors: string;
        profile_params: string;
        _geoip: string;
        Project: boolean;
        TimeOff: boolean;
        Meeting: boolean;
        Attendance: boolean;
        Loan: boolean;
        leave_count_all: number;
        leave_count_tosubmit: number;
        leave_count_toapprove: number;
        leave_count_secondapprove: number;
        leave_count_approved: number;
        leave_count_refused: number;
        employee_info: User;
        StatusDescription: string;
        ArabicMessage: string;
        EnglishMessage: string;
    }
}
