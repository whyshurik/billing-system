import { TransactionService } from "./transaction.service";
import { Body, Controller, Get, Patch, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { AdminRoles } from "../lib/constants";
import { Roles } from "../role/role.decorator";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Request} from 'express'
import { User } from "../user/user.entity";
import { Transaction } from "./transaction.entity";


@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {
  }

  @UseGuards(AuthGuard)
  @Post("create")
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto, @Req() req){
    return await this.transactionService.createTransaction({
      ...createTransactionDto,
      sender: req.user.username,
    });
  }

  @UseGuards(AuthGuard)
  @Roles(AdminRoles.Admin)
  @Get("get-all")
  async getAllPending(): Promise<Transaction[]>{
    return await this.transactionService.findAll()
  }

  @UseGuards(AuthGuard)
  @Roles(AdminRoles.Admin)
  @Get("get-by-sender")
  async getBySender(@Req() req){
    return await this.transactionService.findByUser(req.body.username)
  }


  @UseGuards(AuthGuard)
  @Roles(AdminRoles.Admin)
  @Patch("confirm")
  async confirmTransaction(@Body() createTransactionDto: CreateTransactionDto, @Req() req){}



}