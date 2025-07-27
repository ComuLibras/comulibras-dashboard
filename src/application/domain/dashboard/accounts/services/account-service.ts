import { ApiService } from "@/application/shared/services/api-service";
import { type CreateAccountDTO, type CreateAccountResponse, type GetAccountsResponse, type MeResponse, type UpdateAccountRoleDTO, type UpdateAccountResponse } from "./dto/account-dto";

export class AccountService extends ApiService {
  private readonly baseUrl: string

  constructor(
  ) {
    super();
    this.baseUrl = '/accounts'
  }

  async me() {
    return this.httpClient.get<MeResponse>(`${this.baseUrl}/me`);
  }

  async getAccounts() {
    return this.httpClient.get<GetAccountsResponse>(this.baseUrl);
  }

  async createAccount(dto: CreateAccountDTO) {
    return this.httpClient.post<CreateAccountResponse>(this.baseUrl, dto);
  }

  async updateAccountRole(dto: UpdateAccountRoleDTO, accountId: string) {
    return this.httpClient.patch<UpdateAccountResponse>(`${this.baseUrl}/${accountId}/role`, dto);
  }

  async deleteAccount(accountId: string) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${accountId}`);
  }
}
