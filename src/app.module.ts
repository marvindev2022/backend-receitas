import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { HttpModule } from "@infra/http/http.module";
import { ConfigModule } from "@nestjs/config";
import { BullConfigModule } from "./infra/config/bull.module";
import { MessageController } from "src/app.controler";

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullConfigModule,
    HttpModule,
    DatabaseModule,
  ],
  controllers: [MessageController],
  providers: [],
})
export class AppModule {}
