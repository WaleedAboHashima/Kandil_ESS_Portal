import { api } from "./client";
import type { AttendanceResponse } from "@/types/attendance";

export const attendanceApi = {
    getAllAttendances: async (): Promise<AttendanceResponse> => {
        const { data } = await api.post<AttendanceResponse>("/api/hr.attendance/get_all_attendances", {});

        if (data.result.Code !== 200) {
            throw new Error(data.result.EnglishMessage);
        }

        return data;
    }
};
