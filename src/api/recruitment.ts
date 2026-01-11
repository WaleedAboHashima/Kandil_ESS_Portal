import { api } from "./client";
import type {
  RecruitmentRequestsResponse,
  DepartmentsResponse,
  JobsResponse,
  CreateRecruitmentRequest,
  CreateRecruitmentResponse,
} from "@/types/recruitment";

export const recruitmentApi = {
  getAllRecruitmentRequests: async (): Promise<RecruitmentRequestsResponse> => {
    const { data } = await api.post<RecruitmentRequestsResponse>(
      "/api/hr.recruitment.request/get_all_hr_recruitment_request",
      {}
    );

    if (data.result.Code !== 200) {
      throw new Error(data.result.EnglishMessage);
    }

    return data;
  },

  getAllDepartments: async (): Promise<DepartmentsResponse> => {
    const { data } = await api.post<DepartmentsResponse>(
      "/api/hr.department/get_all_departments",
      {}
    );

    if (data.result.Code !== 200) {
      throw new Error(data.result.EnglishMessage);
    }

    return data;
  },

  getAllJobs: async (): Promise<JobsResponse> => {
    const { data } = await api.post<JobsResponse>(
      "/api/hr.job/get_all_jobs",
      {}
    );

    if (data.result.Code !== 200) {
      throw new Error(data.result.EnglishMessage);
    }

    return data;
  },

  createRecruitmentRequest: async (
    requestData: CreateRecruitmentRequest
  ): Promise<CreateRecruitmentResponse> => {
    const { data } = await api.post<CreateRecruitmentResponse>(
      "/api/hr.recruitment.request/create_user_recruitment_requests",
      requestData
    );

    if (data.result.Code !== 200) {
      throw new Error(data.result.EnglishMessage);
    }

    return data;
  },
};
