import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/queries/keys";
import { departmentTransferApi } from "@/api/department-transfer";
import type { CreateDepartmentTransferRequest, DeleteDepartmentTransferRequest } from "@/types/department-transfer";
import { ToastError, ToastSuccess } from "@/components/Toast";

export const useTransferRequests = () => {
  return useQuery({
    queryKey: queryKeys.departmentTransfer.requests,
    queryFn: async () => {
      const response = await departmentTransferApi.getAllTransferRequests();
      return response.result.Data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useEmployeeInfo = () => {
  return useQuery({
    queryKey: queryKeys.departmentTransfer.employees,
    queryFn: async () => {
      const response = await departmentTransferApi.getEmployeeInfo();
      return response.result.Data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateDepartmentTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transferData: CreateDepartmentTransferRequest) =>
      departmentTransferApi.createDepartmentTransfer(transferData),
    onSuccess: (data) => {
      ToastSuccess(data.result.EnglishMessage);
      queryClient.invalidateQueries({
        queryKey: queryKeys.departmentTransfer.requests,
      });
    },
    onError: (error: Error) => {
      ToastError(error.message);
    },
  });
};

export const useDeleteDepartmentTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deleteData: DeleteDepartmentTransferRequest) =>
      departmentTransferApi.deleteDepartmentTransfer(deleteData),
    onSuccess: (data) => {
      ToastSuccess(data.result.EnglishMessage);
      queryClient.invalidateQueries({
        queryKey: queryKeys.departmentTransfer.requests,
      });
    },
    onError: (error: Error) => {
      ToastError(error.message);
    },
  });
};
