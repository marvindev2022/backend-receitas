import { Module } from "@nestjs/common";
import { UsersDatabaseModule } from "./prisma/repositories/prisma-user-database.module";
import { RecipesDatabaseModule } from "./prisma/repositories/prisma-recipe-database.module";

@Module({
  imports: [UsersDatabaseModule,RecipesDatabaseModule],
})
export class DatabaseModule {}
