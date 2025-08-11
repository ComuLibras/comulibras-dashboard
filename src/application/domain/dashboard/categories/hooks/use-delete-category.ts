import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { makeCategoriesService } from "../services/make-categories-service";

interface Props {
  categoryId: string;
}

export function useDeleteCategory() {
  const categoriesService = makeCategoriesService();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteCategory, ...rest } = useMutation({
    mutationFn: ({ categoryId }: Props) => categoriesService.deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria removida com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao remover categoria");
    },
  });

  return { deleteCategory, ...rest, isLoading: rest.isPending };
} 