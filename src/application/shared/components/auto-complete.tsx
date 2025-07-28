import { Button } from "@/application/shared/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/application/shared/components/ui/command"
import { FormControl } from "@/application/shared/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/application/shared/components/ui/popover"
import { cn } from "@/application/shared/lib/utils"
import type { ClassValue } from "clsx"
import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"

interface Props<T> {
  value: string;
  className?: ClassValue;
  renderButton: (value: string) => React.ReactNode;
  items: T[];
  renderItem: (value: T) => React.ReactNode;
  onSelect: (value: T) => void;
  emptyMessage?: string;
  placeholder?: string;
  getValue: (value: T) => string;
  align?: "start" | "end" | "center";
}

export function Autocomplete<T>({ value, className, renderButton, items, renderItem, onSelect, emptyMessage, placeholder, getValue, align = "start" }: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover modal open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !value && "text-muted-foreground",
              className,
            )}
          >
            {value
              ? renderButton(value)
              : placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align={align} className={cn("w-full p-0 left-0", className)}>
        <Command>
          <CommandInput
            placeholder={placeholder}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  value={getValue(item)}
                  key={getValue(item)}
                  onSelect={() => {
                    onSelect(item)
                    setIsOpen(false)
                  }}
                >
                  {renderItem(item)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
