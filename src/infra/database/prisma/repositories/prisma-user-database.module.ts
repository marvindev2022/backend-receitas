import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserRepository } from '@app/repositories/User/user';
import { PrismaUserRepository } from './prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
  exports: [{ provide: UserRepository, useClass: PrismaUserRepository }],
})
export class UsersDatabaseModule {}
