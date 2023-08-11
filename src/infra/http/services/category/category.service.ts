import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "@app/repositories/Categories/category";
import { Category } from "@domain/Categories/Categories";

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoriesRepository) {}

  async getAllCategories(): Promise<Category["props"][] | Error> {
    return this.categoryRepository.findAllCategories();
  }
}
