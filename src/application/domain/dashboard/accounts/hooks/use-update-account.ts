import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type HttpAxiosError } from '@/application/shared/clients/http-client';
import { type AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { type UpdateAccountDTO, type UpdateAccountResponse } from '@/application/domain/dashboard/accounts/services/dto/account-dto';
import { makeAccountService } from '@/application/domain/dashboard/accounts/services/make-account-service';

interface UpdateAccountParams {
  dto: UpdateAccountDTO;
  accountId: string;
}

export function useUpdateAccount() {
  const accountsService = makeAccountService();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<UpdateAccountResponse>, HttpAxiosError, UpdateAccountParams>({
    mutationFn: async ({ dto, accountId }) => accountsService.updateAccount(dto, accountId),
    onSuccess: () => {
      toast.success('Usuário atualizado com sucesso');

      queryClient.invalidateQueries({
        queryKey: ['accounts']
      });
    },
    onError: (error) => {
      toast.error(error.response?.data.messages);
    }
  });

  return {
    updateAccount: mutateAsync,
    isLoading: isPending,
  };
}
