import { Module } from '@nestjs/common';
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleModule } from "./role/role.module";
import { TransactionModule } from "./transaction/transaction.module";



@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    TransactionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
