import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  roleName: string;

  @OneToMany(() => User, user => user.role)
  users: User[];

}

