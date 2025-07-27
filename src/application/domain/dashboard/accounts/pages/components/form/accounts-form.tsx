import { createAccountDTO, type CreateAccountDTO, updateAccountDTO, type UpdateAccountDTO } from "@/application/domain/dashboard/accounts/services/dto/account-dto";
import { Button } from "@/application/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/application/shared/components/ui/form";
import { Input } from "@/application/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { AccountRoleCombobox } from "./account-role-combobox";


interface Props {
  onSubmit(dto: CreateAccountDTO | UpdateAccountDTO): Promise<void>;
  submitLabel: string;
  initialValues?: UpdateAccountDTO;
}

export const AccountsForm: React.FC<Props> = ({ onSubmit, submitLabel, initialValues }) => {
  const isEditing = !!initialValues;

  const form = useForm<CreateAccountDTO | UpdateAccountDTO>({
    resolver: zodResolver(isEditing ? updateAccountDTO : createAccountDTO),
    defaultValues: initialValues,
  });

  const { formState: { isValid, isDirty, isSubmitted } } = form;

  const handleSubmit: SubmitHandler<CreateAccountDTO | UpdateAccountDTO> = async (dto) => {
    await onSubmit(dto);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-8" autoComplete="off">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do administrador</FormLabel>
                <FormControl>
                  <Input disabled={isEditing} autoComplete="new-name" placeholder="Nome..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail do administrador</FormLabel>
                <FormControl>
                  <Input disabled={isEditing} autoSave="off" autoComplete="new-email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roleCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permissão do administrador</FormLabel>
                <AccountRoleCombobox className="w-full" field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={(isSubmitted && !isValid) || !isDirty} className="w-full">{submitLabel}</Button>
      </form>
    </Form>
  );
};
