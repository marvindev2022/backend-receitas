import { BadRequestException } from '@nestjs/common';

export class MissingParamError extends BadRequestException {
  constructor(param: string) {
    super(`${param} - é obrigatório e não foi informado`, {
      cause: Error(),
    });
  }
}
