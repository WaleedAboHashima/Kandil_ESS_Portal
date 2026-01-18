import { api } from "./client";
import type {
  GetEmployeeInfoResponse,
  GetDepartmentTransferRequestsResponse,
  CreateDepartmentTransferRequest,
  CreateDepartmentTransferResponse,
  DeleteDepartmentTransferRequest,
  DeleteDepartmentTransferResponse,
} from "@/types/department-transfer";

export const departmentTransferApi = {
  getAllTransferRequests:
    async (): Promise<GetDepartmentTransferRequestsResponse> => {
      const { data } = await api.post<GetDepartmentTransferRequestsResponse>(
        "/api/hr.employee.department.transfer/get_all_hr_departmenttransfer_request",
        {},
      );

      if (data.result.Code !== 200) {
        throw new Error(data.result.StatusDescription);
      }

      return data;
    },

  getEmployeeInfo: async (): Promise<GetEmployeeInfoResponse> => {
    const { data } = await api.post<GetEmployeeInfoResponse>(
      "/api/hr.employee.department.transfer/get_employee_info",
      {},
    );

    if (data.result.Code !== 200) {
      throw new Error(data.result.StatusDescription);
    }

    return data;
  },

  createDepartmentTransfer: async (
    transferData: CreateDepartmentTransferRequest,
  ): Promise<CreateDepartmentTransferResponse> => {
    const { data } = await api.post<CreateDepartmentTransferResponse>(
      "/api/hr.employee.department.transfer/add_hr_departmenttransfer_request",
      transferData,
    );

    if (data.result.Code !== 200) {
      throw new Error(data.result.EnglishMessage);
    }

    return data;
  },

  deleteDepartmentTransfer: async (
    deleteData: DeleteDepartmentTransferRequest,
  ): Promise<DeleteDepartmentTransferResponse> => {
    const { data } = await api.post<DeleteDepartmentTransferResponse>(
      "/api/hr.employee.department.transfer/delete_hr_departmenttransfer_request",
      deleteData,
    );

    if (data.result.Code !== 200) {
      throw new Error(data.result.EnglishMessage);
    }

    return data;
  },
};
