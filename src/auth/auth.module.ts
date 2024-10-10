import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "20m" }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {
}