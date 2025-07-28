import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { makeSentencesService } from "../services/make-sentences-service";

interface Props {
  sentenceId: string;
}

export function useDeleteSentence() {
  const sentencesService = makeSentencesService();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteSentence, ...rest } = useMutation({
    mutationFn: ({ sentenceId }: Props) => sentencesService.deleteSentence(sentenceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentences"] });
      toast.success("Frase removida com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao remover frase");
    },
  });

  return { deleteSentence, ...rest };
} 