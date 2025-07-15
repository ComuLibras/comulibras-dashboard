import { z } from "zod";

export enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  BOOK_MANAGER = 'BOOK_MANAGER',
  USER_MANAGER = 'USER_MANAGER',
  USER = 'USER',
}

export interface Account {
  id: string;
  name: string;
  email: string;
  roleCode: Roles;
  createdAt: Date;
  updateAt: Date;
}

export type MeResponse = Account;

export interface GetAccountsResponse {
  data: Account[];
  totalItems: number;
}

export const createAccountDTO = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Formato de email inválido'),
  roleCode: z.nativeEnum(Roles, { error: 'A permissão do usuário é obrigatória' }),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});
export type CreateAccountDTO = z.infer<typeof createAccountDTO>;
export type CreateAccountResponse = Account;

export const updateAccountDTO = createAccountDTO.partial();
export type UpdateAccountDTO = z.infer<typeof updateAccountDTO>;
export type UpdateAccountResponse = Account;

