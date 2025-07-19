import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Roles, type Account } from "@/application/domain/dashboard/accounts/services/dto/account-dto"
import { Button } from "@/application/shared/components/ui/button"
import { AccountsTableActions } from "./accounts-table-actions"
import { Icon, type IconProps } from "@/application/shared/components/ui/icon"
import { Switch } from "@/application/shared/components/ui/switch"

type RoleIcon = IconProps['name'];
type RoleLabel = string;
type Role = {
  label: RoleLabel;
  icon: RoleIcon;
}

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase px-3">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Permissão",
    cell: ({ row }) => {

      const map: Record<Roles, Role> = {
        [Roles.ADMIN]: {
          label: "Administrador Geral",
          icon: "users-round",
        },
        [Roles.MANAGER]: {
          label: "Administrador de frases",
          icon: "list-video",
        },
        [Roles.USER]: {
          label: "Usuário",
          icon: "user",
        },
      }

      const role = row.getValue("role") as Roles;
      const label = map[role];

      return (
        <div className="flex items-center gap-2">
          <Icon name={label.icon} className="size-4" />
          {label.label}
        </div>
      )
    },
  },
  {
    accessorKey: "isPasswordCreated",
    header: () => {
      return (
        <div className="flex justify-center">
          Senha Criada
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Icon name={row.getValue("isPasswordCreated") ? "check-check" : "x"} className="size-6" />
        </div>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: () => {
      return (
        <div className="flex justify-center">
          Ativo
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("isActive") as boolean;

      return (
        <div className="flex justify-center">
          <Switch onCheckedChange={() => {}} checked={value} />
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const account = row.original

      return <AccountsTableActions account={account} />
    },
  },
]
