import { Module } from '@nestjs/common';
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";


@Module({
  imports: [
    AuthModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
