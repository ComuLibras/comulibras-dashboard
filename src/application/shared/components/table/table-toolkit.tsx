import { Button } from "@/application/shared/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/application/shared/components/ui/dropdown-menu";
import { Input } from "@/application/shared/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { LucideSettings2 } from "lucide-react";

interface Props<T> {
  mappedView: Partial<Record<keyof T, string>> & Record<string, string>;
  table: Table<T>;
  filterPlaceholder?: string;
  filterKey?: keyof T extends string ? keyof T : never;
}

export function TableToolkit<T>(props: Props<T>) {
  const { mappedView, table, filterKey, filterPlaceholder } = props;

  return (
    <div className="flex items-center py-4 gap-4">
      {filterKey && (
        <Input
          placeholder={filterPlaceholder}
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            <LucideSettings2 /> Visualizar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full" align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {(mappedView[column.id as keyof T]) ?? column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
