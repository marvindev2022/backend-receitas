import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { RecipesDatabaseModule } from "@infra/database/prisma/repositories/prisma-recipe-database.module";
import { RecipesController } from "./recipes.controller";
import { RecipeService } from "@infra/http/services/Recipe/recipes.service";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { ValidateToken } from "@infra/http/middlewares/users/validateToken";

@Module({
  imports: [RecipesDatabaseModule],
  controllers: [RecipesController],
  providers: [RecipeService, PrismaService],
})
export class RecipesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateToken)
      .forRoutes(
        { path: "/recipes/*", method: RequestMethod.POST },
        { path: "/recipes/*", method: RequestMethod.PUT },
        { path: "/recipes/*", method: RequestMethod.PATCH }
      );
  }
}
