import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Roles, type Account } from "@/application/domain/dashboard/accounts/services/dto/account-dto"
import { Button } from "@/application/shared/components/ui/button"
import { AccountsTableActions } from "./accounts-table-actions"
import { Icon } from "@/application/shared/components/ui/icon"
import { Switch } from "@/application/shared/components/ui/switch"
import { AccountRole } from "../account-role"

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
      const role = row.getValue("role") as Roles;
      return <AccountRole role={role} />
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
