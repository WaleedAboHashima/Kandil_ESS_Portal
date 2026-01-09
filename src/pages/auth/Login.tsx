import { LoginForm } from "@/components/login-form";
import { AuroraBackground } from "@/components/ui/aurora-background";
import logo from "@/assets/images/logo.png"
import { useIsMobile } from "@/hooks/use-mobile";

export default function Login() {
    const isMobile = useIsMobile();
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            {!isMobile &&
                <AuroraBackground>
                    <div className="flex justify-center">
                        <img src={logo} alt="Logo" className="animate-pulse animation-duration-5000" />
                    </div>
                </AuroraBackground>
            }
            <div className="flex w-full items-center justify-center md:">
                <div className="w-full max-w-md space-y-8 px-4">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-semibold">Welcome back</h2>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Please sign in to your account
                        </p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
