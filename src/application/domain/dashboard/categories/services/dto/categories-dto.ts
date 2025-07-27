import z from "zod";
import { Colors } from "../../pages/components/color-combobox/colorsMap";
import { iconNames } from "lucide-react/dynamic";
import type { IconProps } from "@/application/shared/components/ui/icon";


export type Category = {
  id: string;
  name: string;
  color: Colors;
  icon: IconProps['name'];
  isActive: boolean;
  sentenceCount: number;
  isFavorite?: boolean | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export type GetCategoriesResponse = Category[];

export const createCategoryBody = z.object({
  name: z.string().min(1),
  color: z.enum(Colors),
  icon: z.enum(iconNames),
});

export type CreateCategoryBody = z.infer<typeof createCategoryBody>;
export type CreateCategoryResponse = Category;

export const updateCategoryBody = createCategoryBody.partial();
export type UpdateCategoryBody = z.infer<typeof updateCategoryBody>;
export type UpdateCategoryResponse = Category;

