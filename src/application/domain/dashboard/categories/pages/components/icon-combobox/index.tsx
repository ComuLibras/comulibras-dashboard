import { Button } from "@/application/shared/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/application/shared/components/ui/command"
import { FormControl } from "@/application/shared/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/application/shared/components/ui/popover"
import { cn } from "@/application/shared/lib/utils"
import type { ClassValue } from "clsx"
import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { type ControllerRenderProps, useFormContext } from "react-hook-form"
import type { CreateCategoryBody } from "../../../services/dto/categories-dto"
import { IconItem } from "./iconItem"
import { iconNames } from "lucide-react/dynamic"

interface Props {
  field: ControllerRenderProps<CreateCategoryBody, "icon">;
  className?: ClassValue;
}

export function IconCombobox({ field, className }: Props) {
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
              ? <IconItem icon={field.value} />
              : "Selecione o ícone"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align="start" className={cn("w-full p-0 left-0", className)}>
        <Command>
          <CommandInput
            placeholder="Pesquisar ícone..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>Nenhum ícone encontrado.</CommandEmpty>
            <CommandGroup>
              {iconNames.map((icon) => (
                <CommandItem
                  value={icon}
                  key={icon}
                  onSelect={() => {
                    form.setValue("icon", icon, { shouldDirty: true })
                    setIsOpen(false)
                  }}
                >
                  <IconItem icon={icon} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
