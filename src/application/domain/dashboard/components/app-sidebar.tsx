import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, SidebarRail,
  useSidebar
} from "@/application/shared/components/ui/sidebar";

import ComulibrasLogo from '@/application/assets/logo.png';
import { Separator } from "@/application/shared/components/ui/separator";
import { cn } from "@/application/shared/lib/utils";
import { type LucideIcon } from "lucide-react";
import { NavLink } from "react-router";
import { NavUser } from "./nav-user";

export interface Items {
  title: string;
  url: string;
  Icon?: LucideIcon;
  isActive?: boolean;
}

interface Props {
  items: Items[]
}

export function AppSidebar({ items }: Props) {
  const { open } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center justify-start flex-row" >
        <img src={ComulibrasLogo} alt="" className={cn("size-24", !open && "size-12")} />
        <h1 className="text-2xl">
          {open && 'Sinaliza'}
        </h1>
      </SidebarHeader>
      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Páginas</SidebarGroupLabel>
          <SidebarMenu>
            {items.map(({ title, url, Icon }) => (
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={title}>
                  <NavLink to={url}>
                    {Icon && <Icon />}
                    <span>{title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter >
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
