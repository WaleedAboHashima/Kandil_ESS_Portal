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
