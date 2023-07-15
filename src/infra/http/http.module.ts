import { Module } from '@nestjs/common';
import { UsersModule } from './controllers/users/user.module';

@Module({
  imports: [
    UsersModule,
  ],
})
export class HttpModule {}
