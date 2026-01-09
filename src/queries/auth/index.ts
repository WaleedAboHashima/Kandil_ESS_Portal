import { useMutation } from "@tanstack/react-query";
import { authApi, type LoginCredentials } from "@/api/auth";
import { cookies } from "@/lib/utils";
import { ToastError, ToastSuccess } from "@/components/Toast";
import { useRouter } from "@tanstack/react-router";




export const useLoginMutation = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
        onSuccess: (data) => {
            const { token, employee_info } = data.result;
            cookies.set("token", token);
            ToastSuccess(`Welcome Back ${employee_info.employee_name || data.result.company_name}`);
            router.navigate({ to: "/", replace: true });
        },
        onError: (error) => {
            ToastError(error.message);
        }
    })
}
