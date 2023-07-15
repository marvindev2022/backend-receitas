import { MissingParamError } from '@app/errors/MissingParamError';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class EmailAlreadyExistsMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email) {
      const missingParam = new MissingParamError('email');
      throw new BadRequestException(missingParam.message);
    }

    const databaseRegister = await this.prismaService.users.findUnique({
      where: { email },
      select: { email: true },
    });

    if (databaseRegister?.email) {
      throw new BadRequestException('Usuario já existe');
    }

    next();
  }
}
