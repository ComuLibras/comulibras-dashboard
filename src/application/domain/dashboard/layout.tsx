import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/application/shared/components/ui/sidebar";
import { Outlet } from "react-router";

import { AppSidebar } from "./components/app-sidebar";
import { layoutItems } from "./layout-items";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar items={layoutItems} />
      <SidebarInset>
        <header className="flex h-[72px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="px-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
