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

import { Separator } from "@/application/shared/components/ui/separator";
import { type LucideIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { NavUser } from "./nav-user";
import { Logo } from "@/application/shared/components/logo";
import { cn } from "@/application/shared/lib/utils";

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
  const location = useLocation();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center justify-start flex-row" >
        <Logo className={["h-fit size-24 transition-all ease-linear", !open ? "size-12" : ""]} />
        <h1 className="text-2xl">
          {open && 'ComuLibras'}
        </h1>
      </SidebarHeader>
      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Páginas</SidebarGroupLabel>
          <SidebarMenu>
            {items.map(({ title, url, Icon }) => {
              const isActive = location.pathname === url;
              
              return (
                <SidebarMenuItem key={url}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={title}
                    isActive={isActive}
                    className={cn(
                      
                      "transition-all duration-200"
                    )}
                  >
                    <NavLink to={url}>
                      {Icon && (
                        <Icon className={cn(
                          "size-4 transition-colors duration-200",
                          isActive && "text-primary"
                        )} />
                      )}
                      <span className={cn(
                        "transition-colors duration-200",
                        isActive && "font-medium"
                      )}>
                        {title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
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
