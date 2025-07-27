import { CreateCategoryButton } from "./components/create-category-button";
import { CategoriesContent } from "./content";
import { Table } from "@/application/shared/components/table";

export function CategoriesPage() {
  return (
    <Table.Wrapper 
      title="Categorias" 
      subtitle="Gerencie todas as categorias disponíveis"
      renderAddButton={() => <CreateCategoryButton />}
    >
      <CategoriesContent />
    </Table.Wrapper>
  )
}