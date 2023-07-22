import { CategoriesRepository } from '@app/repositories/Categories/category';
import { Injectable} from '@nestjs/common';
import { Categories } from '@prisma/client';

@Injectable()
export class InMemoryCategoriesRepository implements CategoriesRepository {
  private Categories: Categories[] = [];

  async findAllCategories(): Promise<Categories[]> {
    return this.Categories;
  }
}


