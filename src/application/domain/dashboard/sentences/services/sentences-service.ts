import { ApiService } from "@/application/shared/services/api-service";
import type {
  CreateSentenceBody,
  CreateSentenceResponse,
  GetSentencesResponse,
  UpdateSentenceBody,
  UpdateSentenceResponse,
  UpdateSentenceStatusBody,
  UpdateSentenceStatusResponse
} from "./dto/sentences-dto";

export class SentencesService extends ApiService {
  private readonly baseUrl: string

  constructor(
  ) {
    super();
    this.baseUrl = '/sentences'
  }

  async getSentences() {
    const data = await this.httpClient.get<GetSentencesResponse>(this.baseUrl);

    return {
      data: data.data.sentences,
    }
  }

  async createSentence(dto: CreateSentenceBody) {
    return this.httpClient.post<CreateSentenceResponse>(this.baseUrl, {
      ...dto,
    });
  }

  async updateSentence(dto: UpdateSentenceBody, sentenceId: string) {
    return this.httpClient.put<UpdateSentenceResponse>(`${this.baseUrl}/${sentenceId}`, {
      ...dto,
    });
  }

  async updateSentenceStatus(dto: UpdateSentenceStatusBody, sentenceId: string) {
    return this.httpClient.patch<UpdateSentenceStatusResponse>(`${this.baseUrl}/${sentenceId}/status`, dto);
  }

  async deleteSentence(sentenceId: string) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${sentenceId}`);
  }
}
