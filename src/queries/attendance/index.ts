import { useQuery } from "@tanstack/react-query";
import { attendanceApi } from "@/api/attendance";
import { queryKeys } from "../keys";

export const useAttendance = () => {
    return useQuery({
        queryKey: queryKeys.attendance.all,
        queryFn: async () => {
            const response = await attendanceApi.getAllAttendances();
            return response.result.Data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useAttendanceSummary = (month: number, year: number) => {
    return useQuery({
        queryKey: ["attendance", "summary", month, year],
        queryFn: async () => {
            const response = await attendanceApi.getAttendanceSummary(month, year);
            return response.result.Data;
        },
        enabled: !!month && !!year,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnMount: true,
    });
};

export const useAttendanceStatus = (month: number, year: number) => {
    return useQuery({
        queryKey: ["attendance", "status", month, year],
        queryFn: async () => {
            const response = await attendanceApi.getAttendanceStatus(month, year);
            return response.result.Data;
        },
        enabled: !!month && !!year,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnMount: true,
    });
};
