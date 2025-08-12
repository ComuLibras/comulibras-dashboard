import { useGetCategories } from "@/application/domain/dashboard/categories/hooks/use-get-categories";
import { useDeleteCategory } from "@/application/domain/dashboard/categories/hooks/use-delete-category";
import { useUpdateCategory } from "@/application/domain/dashboard/categories/hooks/use-update-category";
import { type UpdateCategoryBody } from "@/application/domain/dashboard/categories/services/dto/categories-dto";
import { Table } from "@/application/shared/components/table";
import { useTable } from "@/application/shared/hooks/use-table";
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo, useState } from 'react';
import { CategoriesForm } from "../form/categories-form";
import { getCategoriesColumns } from "./categories-table-columns";
import { useUpdateCategoryStatus } from "../../../hooks/use-update-category-status";
import TableLoading from "@/components/mvpblocks/skeleton-table-1";

export function CategoriesTable() {
  const { categories } = useGetCategories();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});

  const { updateCategoryStatus } = useUpdateCategoryStatus();

  const columns = useMemo(() => getCategoriesColumns({ updateCategoryStatus }), [updateCategoryStatus]);

  const table = useReactTable({
    data: categories,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const { selectedId, setIsEditDialogOpen } = useTable();
  const initialValues = useMemo(() => categories.find((category) => category.id === selectedId), [categories, selectedId]);

  const { deleteCategory, isLoading: isDeleteLoading } = useDeleteCategory();

  const { updateCategory, isLoading } = useUpdateCategory();

  async function handleUpdateCategory(dto: UpdateCategoryBody) {
    await updateCategory({ dto, categoryId: selectedId! });

    setIsEditDialogOpen(false);
  }

  if (isLoading) {
    return <TableLoading rowCount={10} columnCount={5} showTopBar={true} showFilter={true} showColumnToggle={true} bodyClassName="px-0" />;
  }

  return (
    <div>
      <Table.Toolkit
        table={table}
        filterKey="name"
        filterPlaceholder="Filtrar por categoria..."
        mappedView={{
          name: 'Nome',
          icon: 'Ícone',
          sentenceCount: 'Frases',
          isActive: 'Ativo',
        }}
      />
      <Table.Content
        table={table}
        columnsLength={columns.length}
        placeholder="Nenhuma categoria encontrada."
      />

      <Table.DeleteDialog
        title="Tem certeza que deseja excluir essa categoria?"
        subtitle="Essa ação não poderá ser desfeita. Isso excluirá essa categoria permanentemente."
        onConfirm={() => deleteCategory({ categoryId: selectedId! })}
        isLoading={isDeleteLoading}
      />

      <Table.EditDialog
        title="Editar categoria"
        subtitle="Edite os dados da categoria"
      >
        <CategoriesForm isLoading={isLoading} onSubmit={handleUpdateCategory} submitLabel="Editar categoria" initialValues={initialValues} />
      </Table.EditDialog>
    </div>
  )
} 