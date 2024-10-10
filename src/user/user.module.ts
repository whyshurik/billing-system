import { UserService } from "./user.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { RoleModule } from "../role/role.module";
import { UserController } from "./user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User]),RoleModule],
  providers: [UserService],
controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}