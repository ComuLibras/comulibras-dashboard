import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { makeAuthService } from "../services/make-auth-service";
import type { SignInDTO, SignInResponse } from "../services/dto/auth-dto";
import { Roles } from "../../dashboard/accounts/services/dto/account-dto";

export function useSignIn() {
  const authService = makeAuthService();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<SignInResponse>, Error, SignInDTO>({
    mutationFn: authService.signIn.bind(authService),
    onSuccess: (response) => {
      const { accessToken, role } = response.data;
      authService.setToken({ accessToken, role });

      if (!Object.values(Roles).includes(role)) {
        return toast.error('Você não tem permissão de administrador para acessar o painel administrativo, tente acessar o aplicativo.');
      }

      // Verifica se há uma rota salva no sessionStorage
      const redirectPath = sessionStorage.getItem('redirectAfterLogin');
      
      // Remove a rota do sessionStorage
      sessionStorage.removeItem('redirectAfterLogin');
      
      // Se houver rota salva, vai para ela, senão vai para o dashboard padrão
      const targetPath = redirectPath || '/dashboard/categories';

      navigate(targetPath);
      toast.success('Login realizado com sucesso');
    },
    onError: () => toast.error('Credenciais inválidas')
  });

  return {
    signIn: mutateAsync,
    isLoading: isPending,
  }
}
