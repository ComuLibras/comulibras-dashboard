import { z } from "zod";

export enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'SENTENCES_MANAGER',
  USER = 'USER',
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
  roleCode: z.enum(Roles, { error: 'A permissão do usuário é obrigatória' }),
});

export type CreateAccountDTO = z.infer<typeof createAccountDTO>;
export type CreateAccountResponse = Account;

export const updateAccountDTO = createAccountDTO.partial();
export type UpdateAccountDTO = z.infer<typeof updateAccountDTO>;
export type UpdateAccountResponse = Account;

