import { Table } from "@/application/shared/components/table";
import { AccountsPageContent } from "./content";
import { CreateAccountButton } from "./components/create-account-button";

export function AccountsPage() {
  return (
    <Table.Wrapper title="Administradores" subtitle="Gerencie os administradores do sistema." renderAddButton={() => (
      <CreateAccountButton />
    )}>
      <AccountsPageContent />
    </Table.Wrapper>
  )
}