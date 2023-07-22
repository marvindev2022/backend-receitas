import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { CategoriesDatabaseModule } from "@infra/database/prisma/repositories/prisma-category-database.module";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { ValidateToken } from "@infra/http/middlewares/users/validateToken";
import { CategoryController } from "./categories.controller";
import { CategoryService } from "@infra/http/services/category/category.service";

@Module({
  imports: [CategoriesDatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateToken)
      .exclude({ path: '/categories/all', method: RequestMethod.GET })
      .forRoutes(CategoryController);
  }
}
