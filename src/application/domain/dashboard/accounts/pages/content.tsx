import { Table } from "@/application/shared/components/table";
import React from "react";
import { AccountsForm } from "./components/accounts-form";
import { useTable } from "@/application/shared/hooks/use-table";
import { useCreateAccount } from "../hooks/use-create-account";
import type { CreateAccountDTO } from "../services/dto/account-dto";
import { AccountsTable } from "./components/accounts-table";

export function AccountsPageContent() {
  const { setIsAddDialogOpen } = useTable();
  const { createAccount } = useCreateAccount();

  async function handleCreateAccount(dto: CreateAccountDTO) {
    await createAccount(dto);

    setIsAddDialogOpen(false);
  }


  return (
    <React.Fragment>
      <AccountsTable />
      <Table.AddDialog
        title="Adicionar usuário"
        subtitle="Crie um novo usuário"
      >
        <AccountsForm onSubmit={handleCreateAccount} submitLabel="Adicionar usuário" />
      </Table.AddDialog>
    </React.Fragment>
  )
}