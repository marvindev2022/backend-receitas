import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaRecipesRepository } from './prisma-recipe-repository';
import { RecipeRepository } from '@app/repositories/Recipe/recipe';
import { PrismaUserRepository } from './prisma-user-repository';
import { UserRepository } from '@app/repositories/User/user';

@Module({
  providers: [
    PrismaService,
    {
      provide: RecipeRepository,
      useClass: PrismaRecipesRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    RecipeRepository,
    UserRepository,
  ],
})
 
export class RecipesDatabaseModule {}
