import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaRecipesRepository } from './prisma-recipe-repository';
import { RecipeRepository } from '@app/repositories/Recipe/recipe';

@Module({
  providers: [
    PrismaService,
    { provide: RecipeRepository, useClass: PrismaRecipesRepository },
  ],
  exports: [{ provide: RecipeRepository, useClass: PrismaRecipesRepository }],
})
export class RecipesDatabaseModule {}
