import { api } from "./client";
import type {
  AttendanceResponse,
  AttendanceSummaryResponse,
  AttendanceStatusResponse,
} from "@/types/attendance";

export const attendanceApi = {
  getAllAttendances: async (): Promise<AttendanceResponse> => {
    const { data } = await api.post<AttendanceResponse>(
      "/api/hr.attendance/get_all_attendances",
      {}
    );

    if (data.result.Code !== 200) {
      throw new Error(data.result.EnglishMessage);
    }

    return data;
  },

  getAttendanceSummary: async (
    month: number,
    year: number
  ): Promise<AttendanceSummaryResponse> => {
    const { data } = await api.post<AttendanceSummaryResponse>(
      "/api/kandil.attendance.summary/get_all_attendances_summary",
      { month, year }
    );

    if (data.result.Code !== 200) {
      throw new Error(data.result.EnglishMessage);
    }

    return data;
  },

  getAttendanceStatus: async (
    month: number,
    year: number
  ): Promise<AttendanceStatusResponse> => {
    const { data } = await api.post<AttendanceStatusResponse>(
      "/api/kandil.attendance.status/get_all_attendances_status",
      { month, year }
    );

    if (data.result.Code !== 200) {
      throw new Error(data.result.EnglishMessage);
    }

    return data;
  },
};
