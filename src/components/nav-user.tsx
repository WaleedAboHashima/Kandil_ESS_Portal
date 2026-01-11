import { IconDotsVertical, IconLogout } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate } from "@tanstack/react-router";
import { cookies } from "@/lib/utils";
import type { User } from "@/types/auth";

export function NavUser() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  // Safely parse user from localStorage
  let user: User | null = null;
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      user = JSON.parse(userStr) as User;
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    localStorage.removeItem("user");
  }

  // Redirect to login if user is not found
  if (!user) {
    navigate({ to: "/login" });
    return null;
  }

  const handleLogout = () => {
    cookies.remove("token");
    localStorage.removeItem("user");
    navigate({ to: "/login" });
  };

  // Safe function to get user initials
  const getUserInitials = (name: string | undefined): string => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2); // Limit to 2 characters
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.img_link} alt={user.employee_name} />
                <AvatarFallback className="rounded-lg">
                  {getUserInitials(user.employee_name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user.employee_name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.img_link} alt={user.employee_name} />
                  <AvatarFallback className="rounded-lg">
                    {getUserInitials(user.employee_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.employee_name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} variant="destructive">
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
