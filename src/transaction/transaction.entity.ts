import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { TransactionStatus } from "../lib/constants";
import { User } from "../user/user.entity";

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ManyToOne (() => User, user => user.sentTransactions)
  sender: User;

  @ManyToOne (() => User, user => user.receivedTransactions)
  receiver: User;

  @Column('text')
  status: TransactionStatus

  @CreateDateColumn()
  createdAt: Date;



}

