import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type CreateCategoryBody } from "../services/dto/categories-dto";
import { makeCategoriesService } from "../services/make-categories-service";

interface Props {
  dto: CreateCategoryBody;
}

export function useCreateCategory() {
  const categoriesService = makeCategoriesService();
  const queryClient = useQueryClient();

  const { mutateAsync: createCategory, ...rest } = useMutation({
    mutationFn: ({ dto }: Props) => categoriesService.createCategory(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria criada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar categoria");
    },
  });

  return { createCategory, ...rest };
} 