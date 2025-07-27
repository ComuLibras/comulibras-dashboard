import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/application/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/application/shared/components/ui/form";
import { Input } from "@/application/shared/components/ui/input";
import { type Category, createCategoryBody, type CreateCategoryBody, updateCategoryBody, type UpdateCategoryBody } from "../../../services/dto/categories-dto";
import { ColorCombobox } from "../color-combobox";
import { IconCombobox } from "../icon-combobox";

interface Props {
  onSubmit: (dto: CreateCategoryBody | UpdateCategoryBody) => Promise<void>;
  submitLabel: string;
  initialValues?: Category;
}

export function CategoriesForm({ onSubmit, submitLabel, initialValues }: Props) {
  const isEditing = !!initialValues;

  const form = useForm({
    resolver: zodResolver(isEditing ? updateCategoryBody : createCategoryBody),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Categoria</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome da categoria" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-2 w-full">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ícone</FormLabel>
                <FormControl>
                  <IconCombobox field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cor</FormLabel>
                <FormControl>
                  <ColorCombobox field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
} 