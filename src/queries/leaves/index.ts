import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { leavesApi } from "@/api/leaves";
import { queryKeys } from "../keys";
import type { CreateLeaveRequest, DeleteLeaveRequest } from "@/types/leaves";
import { ToastSuccess, ToastError } from "@/components/Toast";

export const useLeaveTypes = () => {
    return useQuery({
        queryKey: queryKeys.leaves.types,
        queryFn: async () => {
            const response = await leavesApi.getAllTimeOff();
            return response.result.Data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useUserLeaves = () => {
    return useQuery({
        queryKey: queryKeys.leaves.userLeaves,
        queryFn: async () => {
            const response = await leavesApi.getUserTimeOff();
            return response.result.Data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useCreateLeave = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (leaveData: CreateLeaveRequest) => leavesApi.createUserTimeOff(leaveData),
        onSuccess: (data) => {
            ToastSuccess(data.result.EnglishMessage);
            // Invalidate both queries to refetch updated data
            queryClient.invalidateQueries({ queryKey: queryKeys.leaves.userLeaves });
            queryClient.invalidateQueries({ queryKey: queryKeys.leaves.types });
        },
        onError: (error: Error) => {
            ToastError(error.message);
        },
    });
};

export const useDeleteLeave = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (deleteData: DeleteLeaveRequest) => leavesApi.deleteUserTimeOff(deleteData),
        onSuccess: (data) => {
            ToastSuccess(data.result.EnglishMessage || "Leave request deleted successfully");
            // Invalidate both queries to refetch updated data
            queryClient.invalidateQueries({ queryKey: queryKeys.leaves.userLeaves });
            queryClient.invalidateQueries({ queryKey: queryKeys.leaves.types });
        },
        onError: (error: Error) => {
            ToastError(error.message);
        },
    });
};
