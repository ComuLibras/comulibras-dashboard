import { Button } from "@/application/shared/components/ui/button";
import { useTable } from "@/application/shared/hooks/use-table";
import { Plus } from "lucide-react";

export function CreateSentenceButton() {
  const { setIsAddDialogOpen } = useTable();

  return (
    <Button onClick={() => setIsAddDialogOpen(true)}>
      <Plus />
      Adicionar frase
    </Button>
  );
} 