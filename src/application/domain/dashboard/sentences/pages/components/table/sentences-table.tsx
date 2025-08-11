import { useGetSentences } from "@/application/domain/dashboard/sentences/hooks/use-get-sentences";
import { useDeleteSentence } from "@/application/domain/dashboard/sentences/hooks/use-delete-sentence";
import { useUpdateSentence } from "@/application/domain/dashboard/sentences/hooks/use-update-sentence";
import { type UpdateSentenceBody } from "@/application/domain/dashboard/sentences/services/dto/sentences-dto";
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
import { SentencesForm } from "@/application/domain/dashboard/sentences/pages/components/form/sentences-form";
import { getSentencesColumns } from "./sentences-table-columns";
import { useUpdateSentenceStatus } from "../../../hooks/use-update-sentence-status";

export function SentencesTable() {
  const { sentences } = useGetSentences();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});

  const { updateSentenceStatus } = useUpdateSentenceStatus();

  const columns = useMemo(() => getSentencesColumns({ updateSentenceStatus }), [updateSentenceStatus]);

  const table = useReactTable({
    data: sentences,
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
  const initialValues = useMemo(() => sentences.find((sentence) => sentence.id === selectedId), [sentences, selectedId]);

  const { deleteSentence, isLoading: isDeleteLoading } = useDeleteSentence();

  const { updateSentence, isLoading: isUpdateLoading } = useUpdateSentence();

  async function handleUpdateSentence(dto: UpdateSentenceBody) {
    await updateSentence({ dto, sentenceId: selectedId! });

    setIsEditDialogOpen(false);
  }

  async function handleDeleteSentence() {
    return deleteSentence({ sentenceId: selectedId! });
  }

  return (
    <div>
      <Table.Toolkit
        table={table}
        filterKey="content"
        filterPlaceholder="Filtrar por frase..."
        mappedView={{
          videoUrl: 'Vídeo',
          content: 'Frase',
          category_name: 'Categoria',
          isActive: 'Ativo',
        }}
      />
      <Table.Content
        table={table}
        columnsLength={columns.length}
        placeholder="Nenhuma frase encontrada."
      />

      <Table.DeleteDialog
        title="Tem certeza que deseja excluir essa frase?"
        subtitle="Essa ação não poderá ser desfeita. Isso excluirá essa frase permanentemente."
        onConfirm={handleDeleteSentence}
        isLoading={isDeleteLoading}
      />

      <Table.EditDialog
        title="Editar frase"
        subtitle="Edite os dados da frase"
      >
        <SentencesForm isLoading={isUpdateLoading} onSubmit={handleUpdateSentence} submitLabel="Editar frase" initialValues={initialValues} />
      </Table.EditDialog>
    </div>
  );
} 