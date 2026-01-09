import type { AuthCallBack } from "@/types/auth";
import { api } from "./client";

export interface LoginCredentials {
    login: string
    password: string
}


export const authApi = {
    login: async (credentilas: LoginCredentials): Promise<AuthCallBack> => {
        const { data } = await api.post<AuthCallBack>("/web/session/erp_authenticate", { "jsonrpc": "2.0", params: { ...credentilas, db: "kandil-glass-stage-26832699" } });
        if (data.result.Code !== 200) throw new Error(data.result.EnglishMessage);
        return data
    }
}