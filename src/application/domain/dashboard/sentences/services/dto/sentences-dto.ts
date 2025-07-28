import z from "zod";
import type { Category } from "../../../categories/services/dto/categories-dto";

export type Sentence = {
  id: string;
  content: string;
  videoUrl: string;
  categoryId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  isFavorite?: boolean | undefined;
  category?: Category;
}
export type GetSentencesResponse = {
  sentences: Sentence[];
  totalSentences: number;
};

export const createSentenceBody = z.object({
  content: z.string().min(1),
  videoUrl: z.string().min(1),
  categoryId: z.string().min(1),
});

export type CreateSentenceBody = z.infer<typeof createSentenceBody>;
export type CreateSentenceResponse = Sentence;

export const updateSentenceBody = createSentenceBody.partial();
export type UpdateSentenceBody = z.infer<typeof updateSentenceBody>;
export type UpdateSentenceResponse = Sentence;

export const updateSentenceStatusBody = z.object({
  isActive: z.boolean(),
});
export type UpdateSentenceStatusBody = z.infer<typeof updateSentenceStatusBody>;
export type UpdateSentenceStatusResponse = Sentence;

