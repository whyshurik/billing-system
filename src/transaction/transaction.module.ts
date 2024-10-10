import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "./transaction.entity";
import { RoleModule } from "../role/role.module";
import { UserModule } from "../user/user.module";


@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), RoleModule, UserModule],
  providers: [TransactionService],
  controllers: [TransactionController]
})
export class TransactionModule {}