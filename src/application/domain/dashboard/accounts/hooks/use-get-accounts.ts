import { useQuery } from '@tanstack/react-query';

import { makeAccountService } from '@/application/domain/dashboard/accounts/services/make-account-service';

export function useGetAccounts(perPage = 10) {
  const accountsService = makeAccountService();

  const { data, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: ['accounts', { page: 1, perPage }],
    queryFn: async () => {
      const response = await accountsService.getAccounts({
        page: 1,
        perPage,
      });

      return response;
    },
  });

  return {
    accounts: data?.data.accounts ?? [],
    isLoading,
  };
}
