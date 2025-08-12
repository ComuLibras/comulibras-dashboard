import { LucideFolder, LucideListVideo, LucideUsersRound } from "lucide-react";
import type { Items } from "./components/app-sidebar";
import { Roles } from "./accounts/services/dto/account-dto";

export const layoutItems: Items[] = [
  {
    title: 'Categorias',
    url: '/dashboard/categories',
    Icon: LucideFolder,
    isActive: true,
  },
  {
    title: 'Frases',
    url: '/dashboard/sentences',
    Icon: LucideListVideo,
    isActive: true,
  },
  {
    title: 'Administradores',
    url: '/dashboard/accounts',
    Icon: LucideUsersRound,
    isActive: true,
    rolesAllowed: [Roles.ADMIN],
  },
];
