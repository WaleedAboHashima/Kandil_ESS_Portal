import { useMutation } from "@tanstack/react-query";
import { authApi, type LoginCredentials } from "@/api/auth";
import { cookies } from "@/lib/utils";
import { ToastError, ToastSuccess } from "@/components/Toast";
import { useRouter } from "@tanstack/react-router";
import { queryKeys } from "../keys";




// Helper to safely store user data in localStorage
const safeSetUserData = (employee_info: any, tz?: string) => {
    try {
        // Check if localStorage is available
        if (typeof window === 'undefined' || !window.localStorage) {
            console.warn('localStorage is not available');
            return false;
        }

        // Only store minimal, non-sensitive user data
        const safeUserData = {
            employee_name: employee_info.employee_name || '',
            email: employee_info.email || '',
            img_link: employee_info.img_link || '',
            employee_id: employee_info.employee_id || null,
            tz: tz || '',
            // Exclude sensitive fields: employee_pin, phone, mobile, etc.
        };

        localStorage.setItem("user", JSON.stringify(safeUserData));
        return true;
    } catch (error) {
        console.error('Error storing user data:', error);
        // Handle quota exceeded or other localStorage errors
        return false;
    }
};

export const useLoginMutation = () => {
    const router = useRouter();
    return useMutation({
        mutationKey: [queryKeys.auth.user],
        mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
        onSuccess: (data) => {
            const { token, employee_info, context } = data.result;

            try {
                // Store token in cookies (more secure for auth)
                cookies.set("token", token);

                // Store minimal user data in localStorage
                safeSetUserData(employee_info, context?.tz);

                ToastSuccess(`Welcome Back ${employee_info.employee_name || data.result.company_name}`);
                router.navigate({ to: "/", replace: true });
            } catch (error) {
                console.error('Login success handler error:', error);
                ToastError('Failed to complete login. Please try again.');
            }
        },
        onError: (error) => {
            ToastError(error.message);
        }
    })
}
