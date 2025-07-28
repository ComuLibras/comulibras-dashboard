import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type UpdateCategoryStatusBody } from "../services/dto/categories-dto";
import { makeCategoriesService } from "../services/make-categories-service";

interface Props {
  dto: UpdateCategoryStatusBody;
  categoryId: string;
}

export function useUpdateCategoryStatus() {
  const categoriesService = makeCategoriesService();
  const queryClient = useQueryClient();

  const { mutateAsync: updateCategoryStatus, ...rest } = useMutation({
    mutationFn: ({ dto, categoryId }: Props) => categoriesService.updateCategoryStatus(dto, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria atualizada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar categoria");
    },
  });

  return { updateCategoryStatus, ...rest };
} 

export type UseUpdateCategoryStatus = ReturnType<typeof useUpdateCategoryStatus>;