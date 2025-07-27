import { useQuery } from '@tanstack/react-query';

import { makeAccountService } from '@/application/domain/dashboard/accounts/services/make-account-service';

export function useGetAccounts() {
  const accountsService = makeAccountService();

  const { data, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await accountsService.getAccounts();

      return response;
    },
  });

  return {
    accounts: data?.data.accounts ?? [],
    isLoading,
  };
}
