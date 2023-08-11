import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://main--elegant-meringue-f75e57.netlify.app'
  });

  await app.listen(3000);
}
bootstrap();

