import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { cookies } from "@/lib/utils";

export const Route = createFileRoute("/_public")({
  beforeLoad: () => {
    const isAuthenticated = cookies.get("token") !== undefined;

    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: () => <Outlet />,
});

