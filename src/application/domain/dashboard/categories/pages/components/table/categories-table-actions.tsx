import { type Category } from "@/application/domain/dashboard/categories/services/dto/categories-dto";
import { Button } from "@/application/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/application/shared/components/ui/dropdown-menu";
import { useTable } from "@/application/shared/hooks/use-table";
import { LucidePencil, LucideTrash2, MoreHorizontalIcon } from "lucide-react";

interface Props {
  category: Category;
}

export const CategoriesTableActions: React.FC<Props> = ({ category }) => {

  const { setIsDeleteDialogOpen, setIsEditDialogOpen, setSelectedId } = useTable();

  function handleEdit() {
    setSelectedId(category.id);
    setIsEditDialogOpen(true)
  }

  function handleDelete() {
    setSelectedId(category.id);
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontalIcon className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            <DropdownMenuItem variant="default" onClick={handleEdit}>
              <LucidePencil />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={handleDelete}>
              <LucideTrash2 />
              Remover
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 