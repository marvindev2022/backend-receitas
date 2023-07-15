import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          tls: {
            rejectUnauthorized: true,
          },
        },
      }),
    }),
  ],
})
export class BullConfigModule {}
