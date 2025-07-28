import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type UpdateSentenceStatusBody } from "../services/dto/sentences-dto";
import { makeSentencesService } from "../services/make-sentences-service";

interface Props {
  dto: UpdateSentenceStatusBody;
  sentenceId: string;
}

export function useUpdateSentenceStatus() {
  const sentencesService = makeSentencesService();
  const queryClient = useQueryClient();

  const { mutateAsync: updateSentenceStatus, ...rest } = useMutation({
    mutationFn: ({ dto, sentenceId }: Props) => sentencesService.updateSentenceStatus(dto, sentenceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentences"] });
      toast.success("Status da frase atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar status da frase");
    },
  });

  return { updateSentenceStatus, ...rest };
}

export type UseUpdateSentenceStatus = ReturnType<typeof useUpdateSentenceStatus>; 