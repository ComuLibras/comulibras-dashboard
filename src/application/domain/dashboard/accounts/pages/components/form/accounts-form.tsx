import { createAccountDTO, type CreateAccountDTO, Roles } from "@/application/domain/dashboard/accounts/services/dto/account-dto";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/application/shared/components/ui/form";
import { Input } from "@/application/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Autocomplete } from "@/application/shared/components/auto-complete";
import { AccountRole } from "../account-role";
import { PasswordInput } from "@/application/shared/components/ui/password-input";
import { LoadingButton } from "@/application/shared/components/ui/loading-button";

interface Props {
  onSubmit(dto: CreateAccountDTO): Promise<void>;
  submitLabel: string;
  initialValues?: CreateAccountDTO;
  isLoading: boolean;
}

export const AccountsForm: React.FC<Props> = ({ onSubmit, submitLabel, initialValues, isLoading }) => {
  const isEditing = !!initialValues;

  const form = useForm<CreateAccountDTO>({
    resolver: zodResolver(createAccountDTO),
    defaultValues: initialValues,
  });

  const { formState: { isValid, isDirty, isSubmitted } } = form;

  const handleSubmit: SubmitHandler<CreateAccountDTO> = async (dto) => {
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permissão do administrador</FormLabel>
                <FormControl>
                  <Autocomplete
                    value={String(field.value)}
                    renderButton={(role) => <AccountRole role={role as Roles} />}
                    items={Object.values(Roles)}
                    renderItem={(role) => <AccountRole role={role} />}
                    getValue={(role) => role}
                    onSelect={(role) => field.onChange(role)}
                    placeholder="Selecione a função"
                    emptyMessage="Nenhuma função encontrada."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <PasswordInput 
                    {...field} 
                    disabled={isEditing}
                    autoComplete="new-password"
                    placeholder="******" 
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <PasswordInput 
                    {...field} 
                    disabled={isEditing}
                    autoComplete="confirm-password"
                    placeholder="******" 
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <LoadingButton isLoading={isLoading} type="submit" disabled={(isSubmitted && !isValid) || !isDirty} className="w-full">
          {submitLabel}
        </LoadingButton>
      </form>
    </Form>
  );
};
