import {
  BaseEntity,  Column,  Entity,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn
} from "typeorm";
import { UserStatuses } from "../lib/constants";
import { Transaction } from "../transaction/transaction.entity";
import { Role } from "../role/role.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  username: string;

  @Column('text')
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Transaction, transaction => transaction.sender )
  sentTransactions: Transaction[]

  @OneToMany(() => Transaction, transaction => transaction.receiver )
  receivedTransactions: Transaction[]

  @Column('text')
  status: UserStatuses

}

