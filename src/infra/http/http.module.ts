import { Module } from '@nestjs/common';
import { UsersModule } from './controllers/users/user.module';
import { RecipesModule } from './controllers/recipes/recipe.module';

@Module({
  imports: [
    UsersModule,
    RecipesModule
  ],
})
export class HttpModule {}
