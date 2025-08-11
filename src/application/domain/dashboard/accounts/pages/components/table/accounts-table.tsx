import { useGetAccounts } from "@/application/domain/dashboard/accounts/hooks/use-get-accounts";

import { useDeleteAccount } from "@/application/domain/dashboard/accounts/hooks/use-delete-account";
import { useUpdateAccountRole } from "@/application/domain/dashboard/accounts/hooks/use-update-account-role";
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
import { AccountsForm } from "../form/accounts-form";
import { getAccountColumns } from "./accounts-table-columns";
import type { CreateAccountDTO } from "../../../services/dto/account-dto";
import { useUpdateAccountStatus } from "../../../hooks/use-update-account-status";

export function AccountsTable() {
  const { accounts } = useGetAccounts();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});

  const { updateAccountStatus } = useUpdateAccountStatus();

  const columns = useMemo(() => getAccountColumns({ updateAccountStatus: updateAccountStatus }), [updateAccountStatus]);

  const table = useReactTable({
    data: accounts,
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
  const initialValues = useMemo(() => {
    const account = accounts.find((account) => account.id === selectedId);
    if (!account) return null;

    return {
      name: account.name,
      email: account.email,
      roleCode: account.role,
    } as unknown as CreateAccountDTO;
  }, [accounts, selectedId]);

  const { deleteAccount, isLoading: isDeleteLoading } = useDeleteAccount();

  const { updateAccountRole, isLoading: isUpdateLoading } = useUpdateAccountRole();

  async function handleUpdateAcount(dto: CreateAccountDTO) {
    await updateAccountRole({ dto, accountId: selectedId! });

    setIsEditDialogOpen(false);
  }

  return (
    <div>
      <Table.Toolkit
        table={table}
        filterKey="email"
        filterPlaceholder="Filtrar por e-mail..."
        mappedView={{
          name: 'Nome',
          email: 'Email',
          roleCode: 'Função',
        }}
      />
      <Table.Content
        table={table}
        columnsLength={getAccountColumns.length}
        placeholder="Nenhuma conta encontrada."
      />

      <Table.DeleteDialog
        title="Tem certeza que deseja excluir esse usuário?"
        subtitle="Essa ação não poderá ser desfeita. Isso excluirá esse usuário permanentemente."
        onConfirm={() => deleteAccount({ accountId: selectedId! })}
        isLoading={isDeleteLoading}
      />

      <Table.EditDialog
        title="Editar usuário"
        subtitle="Edite os dados cadastrais do usuário"
      >
        <AccountsForm isLoading={isUpdateLoading} onSubmit={handleUpdateAcount} submitLabel="Editar usuário" initialValues={initialValues!} />
      </Table.EditDialog>
    </div>
  );
}
