import { Module } from '@nestjs/common';
import { UsersModule } from './controllers/users/user.module';
import { RecipesModule } from './controllers/recipes/recipe.module';
import { CategoriesModule } from './controllers/categories/category.module';

@Module({
  imports: [
    UsersModule,
    RecipesModule,
    CategoriesModule,
  ],
})
export class HttpModule {}
