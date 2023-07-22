import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CategoriesRepository } from "@app/repositories/Categories/category";
import { PrismaCategoriesRepository } from "./prisma-category-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoriesRepository, useClass: PrismaCategoriesRepository
    },
  ],
  exports: [{provide: CategoriesRepository, useClass: PrismaCategoriesRepository}],
})
export class CategoriesDatabaseModule {}
