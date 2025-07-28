import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type CreateSentenceBody } from "../services/dto/sentences-dto";
import { makeSentencesService } from "../services/make-sentences-service";

interface Props {
  dto: CreateSentenceBody;
}

export function useCreateSentence() {
  const sentencesService = makeSentencesService();
  const queryClient = useQueryClient();

  const { mutateAsync: createSentence, ...rest } = useMutation({
    mutationFn: ({ dto }: Props) => sentencesService.createSentence(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentences"] });
      toast.success("Frase criada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar frase");
    },
  });

  return { createSentence, ...rest };
} 