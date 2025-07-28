import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/application/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/application/shared/components/ui/form";
import { Input } from "@/application/shared/components/ui/input";
import { type Sentence, createSentenceBody, type CreateSentenceBody } from "../../../services/dto/sentences-dto";
import { Autocomplete } from "@/application/shared/components/auto-complete";
import { useGetCategories } from "../../../../categories/hooks/use-get-categories";
import { CategorySelect } from "./category-select";

interface Props {
  onSubmit: (dto: CreateSentenceBody) => Promise<void>;
  submitLabel: string;
  initialValues?: Sentence;
}

export function SentencesForm({ onSubmit, submitLabel, initialValues }: Props) {
  const { categories } = useGetCategories();
  
  const form = useForm({
    resolver: zodResolver(createSentenceBody),
    defaultValues: initialValues ? {
      content: initialValues.content,
      videoUrl: initialValues.videoUrl,
      categoryId: initialValues.categoryId || "",
    } : undefined,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frase</FormLabel>
              <FormControl>
                <Input placeholder="Digite a frase" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Vídeo</FormLabel>
              <FormControl>
                <Input placeholder="Digite a URL do vídeo (YouTube)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Autocomplete
                  value={field.value}
                  renderButton={() => {
                    const selectedCategory = categories.find((cat) => cat.id === field.value);
                    return <CategorySelect category={selectedCategory!} />;
                  }}
                  items={categories}
                  renderItem={(category) => <CategorySelect category={category} />}
                  getValue={(category) => category.id}
                  onSelect={(category) => field.onChange(category.id)}
                  placeholder="Selecione a categoria"
                  emptyMessage="Nenhuma categoria encontrada."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
} 