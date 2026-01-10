import { api } from "./client";
import type {
    LeaveTypeResponse,
    UserLeavesResponse,
    CreateLeaveRequest,
    CreateLeaveResponse,
    DeleteLeaveRequest,
    DeleteLeaveResponse,
} from "@/types/leaves";

export const leavesApi = {
    getAllTimeOff: async (): Promise<LeaveTypeResponse> => {
        const { data } = await api.post<LeaveTypeResponse>("/api/hr.leave.type/get_all_time_off", {});

        if (data.result.Code !== 200) {
            throw new Error(data.result.EnglishMessage);
        }

        return data;
    },

    getUserTimeOff: async (): Promise<UserLeavesResponse> => {
        const { data } = await api.post<UserLeavesResponse>("/api/hr.leave/get_user_time_off", {});

        if (data.result.Code !== 200) {
            throw new Error(data.result.EnglishMessage);
        }

        return data;
    },

    createUserTimeOff: async (leaveData: CreateLeaveRequest): Promise<CreateLeaveResponse> => {
        const { data } = await api.post<CreateLeaveResponse>("/api/hr.leave/create_user_time_off", leaveData);

        if (data.result.Code !== 200) {
            throw new Error(data.result.EnglishMessage);
        }

        return data;
    },

    deleteUserTimeOff: async (deleteData: DeleteLeaveRequest): Promise<DeleteLeaveResponse> => {
        const { data } = await api.post<DeleteLeaveResponse>("/api/hr.leave/delete_user_time_off", deleteData);

        if (data.result.Code !== 200) {
            throw new Error(data.result.EnglishMessage);
        }

        return data;
    },
};
