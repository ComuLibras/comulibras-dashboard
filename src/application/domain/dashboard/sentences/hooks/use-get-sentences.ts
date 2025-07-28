import { useQuery } from "@tanstack/react-query";
import { makeSentencesService } from "../services/make-sentences-service";

export function useGetSentences() {
  const sentencesService = makeSentencesService();

  const { data, isLoading } = useQuery({
    queryKey: ["sentences"],
    queryFn: sentencesService.getSentences.bind(sentencesService),
  });

  return { sentences: data?.data ?? [], total: data?.total ?? 0, isLoading };
} 