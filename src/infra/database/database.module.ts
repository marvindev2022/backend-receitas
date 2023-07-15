import { Module } from "@nestjs/common";
import { UsersDatabaseModule } from "./prisma/repositories/prisma-user-database.module";

@Module({
  imports: [UsersDatabaseModule],
})
export class DatabaseModule {}
