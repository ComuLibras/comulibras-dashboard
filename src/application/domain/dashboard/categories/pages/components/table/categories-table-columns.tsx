import { type ColumnDef } from "@tanstack/react-table"

import { type Category } from "@/application/domain/dashboard/categories/services/dto/categories-dto"
import { Button } from "@/application/shared/components/ui/button"
import { Icon, type IconProps } from "@/application/shared/components/ui/icon"
import { Switch } from "@/application/shared/components/ui/switch"
import { CategoriesTableActions } from "./categories-table-actions"

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "icon",
    header: "Ícone",
    cell: ({ row }) => {
      const icon = row.getValue("icon") as IconProps['name'];
      const color = row.original.color;
      return (
        <div 
          className="flex items-center justify-center size-10 rounded"
          style={{ backgroundColor: `${color}2a` }}
        >
          <Icon name={icon} className="size-6 text-white" color={color} />
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <Icon name={column.getIsSorted() === "asc" ? "arrow-up" : "arrow-down"} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize px-3">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "sentenceCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Frases
          <Icon name={column.getIsSorted() === "asc" ? "arrow-up" : "arrow-down"} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const count = row.getValue("sentenceCount") as number;
      return (
        <div className="flex px-3">
          <span>{count} frases cadastradas</span>
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
      const category = row.original

      return <CategoriesTableActions category={category} />
    },
  },
] 