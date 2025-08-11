import { SentencesTable } from "./components/table/sentences-table";
import { useTable } from "@/application/shared/hooks/use-table";
import { useCreateSentence } from "../hooks/use-create-sentence";
import type { CreateSentenceBody } from "../services/dto/sentences-dto";
import { Table } from "@/application/shared/components/table";
import { SentencesForm } from "./components/form/sentences-form";
import React from "react";

export function SentencesContent() {
  const { setIsAddDialogOpen } = useTable();
  const { createSentence, isLoading } = useCreateSentence();

  async function handleCreateSentence(dto: CreateSentenceBody) {
    await createSentence({ dto });

    setIsAddDialogOpen(false);
  }

  return (
    <React.Fragment>
      <SentencesTable />
      <Table.AddDialog
        title="Criar frase"
        subtitle="Crie uma nova frase para o sistema"
      >
        <SentencesForm onSubmit={handleCreateSentence} submitLabel="Criar frase" isLoading={isLoading} />
      </Table.AddDialog>
    </React.Fragment>
  );
} 