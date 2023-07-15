import { Controller, Get } from '@nestjs/common';

@Controller()
export class MessageController {
  @Get()
  message() {
    const swaggerLink =
      'https://app.swaggerhub.com/apis-docs/MAVIROLERO/BackToMe/1.0.0';
    return `Bem-vindo à API BackToMe! Acesse nossa documentação das rotas: <a href="${swaggerLink}">${swaggerLink}</a>`;
  }
}
