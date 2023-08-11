import { Category } from "@domain/Categories/Categories";
import { CategoryService } from "@infra/http/services/category/category.service";
import { Controller, Get } from "@nestjs/common";

@Controller("categories")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get("all")
  async findAllCategories(): Promise<Category['props'][] | Error> {
    return   this.categoryService.getAllCategories();

  }
}
