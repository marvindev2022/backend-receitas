import { CategoriesRepository } from "@app/repositories/Categories/category";
import { PrismaService } from "../prisma.service";
import {  Injectable } from "@nestjs/common";
import { Category } from "@domain/Categories/Categories";


@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(private prismaService: PrismaService) {}

async findAllCategories(): Promise<Category['props'][]> {
    const categories = await this.prismaService.categories.findMany();
    const categoryList = categories.map((category) => ({
      name: category.name,
      url: category.url,

    }));

    return categoryList;
  }
}
