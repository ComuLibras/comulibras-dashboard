import { TableBody, TableCell, Table as TableComponent, TableHead, TableHeader, TableRow } from "@/application/shared/components/ui/table";
import { flexRender, type Table } from "@tanstack/react-table";

interface Props<T> {
  table: Table<T>;
  columnsLength: number;
  placeholder: string;
}

export function TableContent<T>(props: Props<T>) {
  const { columnsLength, placeholder, table } = props;

  return (
    <div className="rounded-md border">
      <TableComponent>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnsLength}
                  className="h-24 text-center"
                >
                  {placeholder}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableComponent>
    </div>
  );
}
