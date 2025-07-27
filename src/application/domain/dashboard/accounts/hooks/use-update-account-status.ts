import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type HttpAxiosError } from '@/application/shared/clients/http-client';
import { type AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { type UpdateAccountStatusDTO, type UpdateAccountResponse } from '@/application/domain/dashboard/accounts/services/dto/account-dto';
import { makeAccountService } from '@/application/domain/dashboard/accounts/services/make-account-service';

interface UpdateAccountStatusParams {
  dto: UpdateAccountStatusDTO;
  accountId: string;
}

export function useUpdateAccountStatus() {
  const accountsService = makeAccountService();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<UpdateAccountResponse>, HttpAxiosError, UpdateAccountStatusParams>({
    mutationFn: async ({ dto, accountId }) => accountsService.updateAccountStatus(dto, accountId),
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
    updateAccountStatus: mutateAsync,
    isLoading: isPending,
  };
}

export type UseUpdateAccountStatus = ReturnType<typeof useUpdateAccountStatus>;

