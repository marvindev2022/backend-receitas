import { Module } from "@nestjs/common";
import { UsersDatabaseModule } from "./prisma/repositories/prisma-user-database.module";
import { RecipesDatabaseModule } from "./prisma/repositories/prisma-recipe-database.module";
import { CategoriesDatabaseModule } from "./prisma/repositories/prisma-category-database.module";

@Module({
  imports: [
    UsersDatabaseModule,
    RecipesDatabaseModule,
    CategoriesDatabaseModule,
  ],
})
export class DatabaseModule {}
