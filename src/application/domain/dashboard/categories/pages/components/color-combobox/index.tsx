import { Button } from "@/application/shared/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/application/shared/components/ui/command"
import { FormControl } from "@/application/shared/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/application/shared/components/ui/popover"
import { cn } from "@/application/shared/lib/utils"
import type { ClassValue } from "clsx"
import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { type ControllerRenderProps, useFormContext } from "react-hook-form"
import { Color } from "./color"
import type { CreateCategoryBody } from "../../../services/dto/categories-dto"
import { colorsMap } from "./colorsMap"

interface Props {
  field: ControllerRenderProps<CreateCategoryBody, "color">;
  className?: ClassValue;
}

export function ColorCombobox({ field, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useFormContext<CreateCategoryBody>();

  return (
    <Popover modal open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !field.value && "text-muted-foreground",
              className,
            )}
          >
            {field.value
              ? <Color color={field.value} hideHex />
              : "Selecione a cor"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align="start" className={cn("w-full p-0 left-0", className)}>
        <Command>
          <CommandInput
            placeholder="Pesquisar cor..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>Nenhuma cor encontrada.</CommandEmpty>
            <CommandGroup>
              {Object.values(colorsMap).map((color) => (
                <CommandItem
                  value={color.name}
                  key={color.name}
                  onSelect={() => {
                    form.setValue("color", color.hex, { shouldDirty: true })
                    setIsOpen(false)
                  }}
                >
                  <Color color={color.hex} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
