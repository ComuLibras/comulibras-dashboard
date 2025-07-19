import { useQuery } from "@tanstack/react-query";
import { makeAuthService } from "@/application/domain/auth/services/make-auth-service";
import { makeAccountService } from "@/application/domain/dashboard/accounts/services/make-account-service";

export function useMe() {
  const authService = makeAuthService();
  const accountService = makeAccountService();

  const { accessToken } = authService.getToken();

  const { data, isPending } = useQuery({
    queryKey: ['me', accessToken],
    staleTime: 1000 * 60 * 60 * 1, // 1h
    queryFn: accountService.me.bind(accountService),
    refetchOnWindowFocus: true,
  });

  return {
    profile: data?.data ?? null,
    isLoading: isPending,
  }
}
