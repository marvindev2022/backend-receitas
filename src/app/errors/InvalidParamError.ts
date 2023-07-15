import { BadRequestException } from '@nestjs/common';

export class InvalidParamError extends BadRequestException {
  constructor(param: string) {
    super(`${param} - não é um parâmetro válido`, {
      cause: Error(),
    });
  }
}
