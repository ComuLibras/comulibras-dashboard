import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type UpdateCategoryBody } from "../services/dto/categories-dto";
import { makeCategoriesService } from "../services/make-categories-service";

interface Props {
  dto: UpdateCategoryBody;
  categoryId: string;
}

export function useUpdateCategory() {
  const categoriesService = makeCategoriesService();
  const queryClient = useQueryClient();

  const { mutateAsync: updateCategory, ...rest } = useMutation({
    mutationFn: ({ dto, categoryId }: Props) => categoriesService.updateCategory(dto, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria atualizada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar categoria");
    },
  });

  return { updateCategory, ...rest, isLoading: rest.isPending };
} 