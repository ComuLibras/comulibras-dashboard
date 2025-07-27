import { Button } from "@/application/shared/components/ui/button";
import { useTable } from "@/application/shared/hooks/use-table";
import { LucidePlus } from "lucide-react";

export function CreateCategoryButton() {
  const { setIsAddDialogOpen } = useTable();

  return (
    <Button onClick={() => setIsAddDialogOpen(true)}>
      <LucidePlus />
      Adicionar categoria
    </Button>
  )
}
