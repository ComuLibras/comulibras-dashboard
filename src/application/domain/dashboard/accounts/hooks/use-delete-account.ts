import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type HttpAxiosError } from '@/application/shared/clients/http-client';
import { type AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { makeAccountService } from '@/application/domain/dashboard/accounts/services/make-account-service';

interface DeleteAccountParams {
  accountId: string;
}

export function useDeleteAccount() {
  const accountsService = makeAccountService();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<void>, HttpAxiosError, DeleteAccountParams>({
    mutationFn: async ({ accountId }) => accountsService.deleteAccount(accountId),
    onSuccess: () => {
      toast.success('Usuário removido com sucesso');
      queryClient.invalidateQueries({
        queryKey: ['accounts']
      });
    },
    onError: (error) => {
      toast.error(error.response?.data.messages);
    }
  });

  return {
    deleteAccount: mutateAsync,
    isLoading: isPending,
  };
}
