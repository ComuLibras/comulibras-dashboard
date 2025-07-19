import { type CreateAccountDTO, Roles, type UpdateAccountDTO } from "@/application/domain/dashboard/accounts/services/dto/account-dto"
import { Button } from "@/application/shared/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/application/shared/components/ui/command"
import { FormControl } from "@/application/shared/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/application/shared/components/ui/popover"
import { cn } from "@/application/shared/lib/utils"
import type { ClassValue } from "clsx"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { type ControllerRenderProps, useFormContext } from "react-hook-form"
import { AccountRole } from "./account-role"

const roles = Object.values(Roles).map((value) => ({
  label: value,
  value: value,
}));

interface Props {
  field: ControllerRenderProps<CreateAccountDTO | UpdateAccountDTO, "roleCode">;
  className?: ClassValue;
}

export function AccountRoleCombobox({ field, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useFormContext<CreateAccountDTO>();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !field.value && "text-muted-foreground",
              className,
            )}
          >
            {field.value
              ? roles.find(
                  (role) => role.value === field.value
                )?.label
              : "Selecione a função"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align="start" className={cn("w-[200px] p-0 left-0", className)}>
        <Command>
          <CommandInput
            placeholder="Search framework..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  value={role.label}
                  key={role.value}
                  onSelect={() => {
                    form.setValue("roleCode", role.value, { shouldDirty: true })
                    setIsOpen(false)
                  }}
                >
                  <AccountRole role={role.value} />
                  <Check
                    className={cn(
                      "ml-auto",
                      role.value === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
