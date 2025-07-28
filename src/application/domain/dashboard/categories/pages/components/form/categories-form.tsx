import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/application/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/application/shared/components/ui/form";
import { Input } from "@/application/shared/components/ui/input";
import { type Category, createCategoryBody, type CreateCategoryBody } from "../../../services/dto/categories-dto";
import { Autocomplete } from "@/application/shared/components/auto-complete";
import { Color } from "../color-combobox/color";
import { colorsMap } from "../color-combobox/colorsMap";
import { iconNames } from "lucide-react/dynamic";
import { IconItem } from "../icon-combobox/iconItem";

interface Props {
  onSubmit: (dto: CreateCategoryBody) => Promise<void>;
  submitLabel: string;
  initialValues?: Category;
}

export function CategoriesForm({ onSubmit, submitLabel, initialValues }: Props) {
  const form = useForm({
    resolver: zodResolver(createCategoryBody),
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
                  <Autocomplete
                    value={field.value}
                    renderButton={() => <IconItem icon={field.value} />}
                    items={iconNames}
                    renderItem={(icon) => <IconItem icon={icon} />}
                    getValue={(icon) => icon}
                    onSelect={(icon) => field.onChange(icon)}
                    placeholder="Selecione o ícone"
                    emptyMessage="Nenhum ícone encontrado."
                  />
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
                <Autocomplete
                  value={field.value}
                  renderButton={() => <Color color={field.value} hideHex />}
                  items={Object.values(colorsMap)}
                  renderItem={(color) => <Color color={color.hex} />}
                  getValue={(color) => color.hex}
                  onSelect={(color) => field.onChange(color.hex)}
                  placeholder="Selecione a cor"
                  emptyMessage="Nenhuma cor encontrada."
                  align="end"
                />
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