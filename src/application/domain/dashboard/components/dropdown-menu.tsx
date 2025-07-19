import { ChevronsUpDown, Cloud, LogOut, LucideSettings } from "lucide-react";

import { makeAuthService } from "@/application/domain/auth/services/make-auth-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/application/shared/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/application/shared/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/application/shared/components/ui/sidebar";

import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ThemeToggle } from "@/application/shared/components/theme/theme-toggle";
import { Button } from "@/application/shared/components/ui/button";

export function DropdownMenuSettings() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar()

  const queryClient = useQueryClient();

  async function logout() {
    const authService = makeAuthService();

    queryClient.clear();

    authService.logout.bind(authService)();
    navigate('/auth/sign-in');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          tooltip="Configurações de conta"
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage alt={'Amauri Lima'} />
            <AvatarFallback className="rounded-lg">
              {'Amauri Lima'.split(' ').reduce((acc, current) => acc + current[0], '').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Amauri Lima</span>
            <span className="truncate text-xs">amauri.lima@ufcg.edu.br</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage alt={'Amauri Lima'} />
              <AvatarFallback className="rounded-lg">
                {'Amauri Lima'.split(' ').reduce((acc, current) => acc + current[0], '').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Amauri Lima</span>
              <span className="truncate text-xs">amauri.lima@ufcg.edu.br</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <LucideSettings className="size-4" />
              </Button>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
            <ThemeToggle />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={() => {
          window.open("http://localhost:3001/api-docs/#/", "_blank");
        }}>
          <Cloud />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
