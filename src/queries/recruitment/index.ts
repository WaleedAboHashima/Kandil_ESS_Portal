import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { recruitmentApi } from "@/api/recruitment";
import { queryKeys } from "../keys";
import type { CreateRecruitmentRequest } from "@/types/recruitment";
import { ToastSuccess, ToastError } from "@/components/Toast";

export const useRecruitmentRequests = () => {
    return useQuery({
        queryKey: queryKeys.recruitment.requests,
        queryFn: async () => {
            const response = await recruitmentApi.getAllRecruitmentRequests();
            return response.result.Data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useDepartments = () => {
    return useQuery({
        queryKey: queryKeys.recruitment.departments,
        queryFn: async () => {
            const response = await recruitmentApi.getAllDepartments();
            return response.result.Data;
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

export const useJobs = () => {
    return useQuery({
        queryKey: queryKeys.recruitment.jobs,
        queryFn: async () => {
            const response = await recruitmentApi.getAllJobs();
            return response.result.Data;
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

export const useCreateRecruitmentRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (requestData: CreateRecruitmentRequest) => recruitmentApi.createRecruitmentRequest(requestData),
        onSuccess: (data) => {
            ToastSuccess(data.result.EnglishMessage);
            queryClient.invalidateQueries({ queryKey: queryKeys.recruitment.requests });
        },
        onError: (error: Error) => {
            ToastError(error.message);
        },
    });
};
