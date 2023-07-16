import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { UsersDatabaseModule } from "@infra/database/prisma/repositories/prisma-user-database.module";
import { UsersController } from "./users.controller";
import { UserService } from "@infra/http/services/users/users.service";
import { EmailAlreadyExistsMiddleware } from "@infra/http/middlewares/users/emailAlreadyExists";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { ValidateToken } from "@infra/http/middlewares/users/validateToken";
import { RecipeRepository } from "@app/repositories/Recipe/recipe";

@Module({
  imports: [UsersDatabaseModule],
  controllers: [UsersController],
  providers: [UserService,  PrismaService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EmailAlreadyExistsMiddleware)
      .forRoutes({ path: "/users/signup", method: RequestMethod.POST })
      .apply(ValidateToken)
      .exclude({
        path: "/users/:id/change-password",
        method: RequestMethod.PATCH,
      })
      .forRoutes(
        { path: "/users/*", method: RequestMethod.PUT },
        { path: "/users/*", method: RequestMethod.PATCH }
      );
  }
}
