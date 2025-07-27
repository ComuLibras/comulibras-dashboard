
import { CategoriesTable } from "./components/table/categories-table";
import { useTable } from "@/application/shared/hooks/use-table";
import { useCreateCategory } from "../hooks/use-create-category";
import type { CreateCategoryBody } from "../services/dto/categories-dto";
import { Table } from "@/application/shared/components/table";
import { CategoriesForm } from "./components/form/categories-form";
import React from "react";

export function CategoriesContent() {
  const { setIsAddDialogOpen } = useTable();
  const { createCategory } = useCreateCategory();

  async function handleCreateCategory(dto: CreateCategoryBody) {
    await createCategory({ dto });

    setIsAddDialogOpen(false);
  }

  return (
    <React.Fragment>
      <CategoriesTable />
      <Table.AddDialog
        title="Criar categoria"
        subtitle="Crie uma nova categoria para organizar as frases"
      >
        <CategoriesForm onSubmit={handleCreateCategory} submitLabel="Criar categoria" />
      </Table.AddDialog>
    </React.Fragment>
  );
} 