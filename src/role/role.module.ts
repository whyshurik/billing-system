import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleService } from "./role.service";
import { Role } from "./role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService],
//controllers: [UserController]
  exports: [RoleService]
})
export class RoleModule {}