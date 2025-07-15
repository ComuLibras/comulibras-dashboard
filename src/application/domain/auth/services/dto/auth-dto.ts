import { Roles } from '@/application/domain/accounts/services/dto/account-dto';
import z from 'zod';

export const signInDTO = z.object({
  email: z.string().email({ message: 'E-mail inválido' }).min(1),
  password: z.string({ error: 'Senha é obrigatória' }).min(8, 'Senha deve ter mais que 8 caracteres'),
});

export type SignInDTO = z.infer<typeof signInDTO>;
export interface SignInResponse {
  accessToken: string;
  role: Roles
}


export interface Account {
  id: string;
  name: string;
  email: string;
  roleCode: Roles;
  createdAt: Date;
  updateAt: Date;
}

export interface MeResponse {
  account: Account;
}
