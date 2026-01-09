import * as React from "react"
import {
  IconCalendarEvent,
  IconCash,
  IconDashboard,
  IconDoorExit,
  IconUser,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import logo from "@/assets/images/logo-sm.png"


const data = {
  user: {
    name: "Hossam Elsharkawy",
    email: "hossam.elsharkawy@kandilindustries.com",
    avatar: "/logo-sm.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Attendance",
      url: "/attendance",
      icon: IconCalendarEvent,
    },
    {
      title: "Leaves",
      url: "/leaves",
      icon: IconDoorExit,
    },
    {
      title: "Payslips",
      url: "/payslips",
      icon: IconCash,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: IconUser,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <img src={logo} alt="Logo" width={30} height={30} />
              <span className="text-base font-medium">Kandil ESS.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
