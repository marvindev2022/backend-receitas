import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserRepository } from './prisma-user-repository';
import { RecipeRepository } from '@app/repositories/Recipe/recipe';

@Module({
  providers: [
    PrismaService,
    { provide: RecipeRepository, useClass: PrismaUserRepository },
  ],
  exports: [{ provide: RecipeRepository, useClass: PrismaUserRepository }],
})
export class RecipesDatabaseModule {}
