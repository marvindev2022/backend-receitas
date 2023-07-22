import { Category } from "@domainCategories/Categories";

export abstract class CategoriesRepository {
  abstract findAllCategories(): Promise<Category['props'][]>;
}
