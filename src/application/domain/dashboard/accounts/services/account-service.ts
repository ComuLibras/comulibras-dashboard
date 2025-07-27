import { ApiService } from "@/application/shared/services/api-service";
import { type CreateAccountDTO, type CreateAccountResponse, type GetAccountsResponse, type MeResponse, type UpdateAccountDTO, type UpdateAccountResponse } from "./dto/account-dto";

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

  async updateAccount(dto: UpdateAccountDTO, accountId: string) {
    return this.httpClient.put<UpdateAccountResponse>(`${this.baseUrl}/${accountId}`, dto);
  }

  async deleteAccount(accountId: string) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${accountId}`);
  }
}
