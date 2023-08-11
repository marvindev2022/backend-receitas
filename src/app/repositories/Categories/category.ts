import { Category } from "@domain/Categories/Categories";

export abstract class CategoriesRepository {
  abstract findAllCategories(): Promise<Category['props'][]>;
}
