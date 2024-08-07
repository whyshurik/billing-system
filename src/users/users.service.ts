import {Injectable} from "@nestjs/common";
import { Role } from "../roles/role.enum";
export type User = any;
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'johndoe',
      password: 'sigma',
      role: Role.Client,
    },
    {
      userId: 2,
      username: 'maria',
      password: 'willow',
      role: Role.Admin,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}