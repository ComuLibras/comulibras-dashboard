import { z } from "zod";

export enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'SENTENCE_ADMIN',
  // USER = 'USER',
}

export interface Account {
  id: string;
  name: string;
  email: string;
  role: Roles;
  isActive: boolean;
  isPasswordCreated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type MeResponse = Account;

export interface GetAccountsResponse {
  accounts: Account[];
  totalItems: number;
}

export const createAccountDTO = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('Formato de email inválido'),
  role: z.enum(Roles, { error: 'A permissão do usuário é obrigatória' }),
  password: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres'),
  confirmPassword: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres'),
});

export type CreateAccountDTO = z.infer<typeof createAccountDTO>;
export type CreateAccountResponse = Account;

export const updateAccountRoleDTO = createAccountDTO.pick({
  role: true,
});
export type UpdateAccountRoleDTO = z.infer<typeof updateAccountRoleDTO>;
export type UpdateAccountResponse = Account;


export const updateAccountStatusDTO = z.object({
  isActive: z.boolean(),
});

export type UpdateAccountStatusDTO = z.infer<typeof updateAccountStatusDTO>;
export type UpdateAccountStatusResponse = Account;
