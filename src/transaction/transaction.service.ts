import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction } from "./transaction.entity";

import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UserService } from "../user/user.service";
import { TransactionStatus, UserStatuses } from "../lib/constants";
import { User } from "../user/user.entity";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly userService: UserService
  ) {
  }

  async createTransaction(transactionDto: CreateTransactionDto & { sender: string }) {
    try {
      const receiveUser = await this.userService.findOne(transactionDto.receiver);
      if (!receiveUser) {
        return { message: `receiver ${transactionDto.receiver} not found` };
      }
      const transaction = this.transactionRepository.create({
        amount: transactionDto.amount,
        sender: await this.userService.findOne(transactionDto.sender),
        receiver: await this.userService.findOne(transactionDto.receiver),
        status: TransactionStatus.PENDING
      });
      await this.transactionRepository.save(transaction);
      return { message: `transaction created successfully` };
    } catch (error) {
      console.error("Error while saving transaction:", error);
    }
  }

  async findByUser(username: string): Promise<Transaction[] | undefined> {
    return await this.transactionRepository.find({
      where:
        { sender: { username } },
      relations: {
        sender: true,
        receiver: true
      }
    });
  }


  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find({ relations: { receiver: true, sender: true } });
  }

  async changeStatus(transactionId: number, newStatus: TransactionStatus) {
    const transaction = await this.transactionRepository.findOneBy({ id: transactionId });
    transaction.status = newStatus;
    await this.transactionRepository.save(transaction);
    return true;
  }
}