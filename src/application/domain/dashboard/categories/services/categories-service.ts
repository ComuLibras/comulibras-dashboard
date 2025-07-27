import { ApiService } from "@/application/shared/services/api-service";
import { type CreateCategoryBody, type CreateCategoryResponse, type GetCategoriesResponse, type UpdateCategoryBody, type UpdateCategoryResponse } from "./dto/categories-dto";
import { Colors, colorsMap } from "../pages/components/color-combobox/colorsMap";

export class CategoriesService extends ApiService {
  private readonly baseUrl: string

  constructor(
  ) {
    super();
    this.baseUrl = '/categories'
  }

  private convertColorToHex(color: Colors) {
    return colorsMap[color].hex;
  }

  async getCategories() {
    return this.httpClient.get<GetCategoriesResponse>(this.baseUrl);
  }

  async createCategory(dto: CreateCategoryBody) {
    return this.httpClient.post<CreateCategoryResponse>(this.baseUrl, {
      ...dto,
      color: this.convertColorToHex(dto.color),
    });
  }

  async updateCategory(dto: UpdateCategoryBody, categoryId: string) {
    return this.httpClient.put<UpdateCategoryResponse>(`${this.baseUrl}/${categoryId}`, {
      ...dto,
      color: dto.color ? this.convertColorToHex(dto.color) : undefined,
    });
  }

  async deleteCategory(categoryId: string) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${categoryId}`);
  }
}
