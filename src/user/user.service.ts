import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { TransactionStatus, UserStatuses } from "../lib/constants";
import { RoleService } from "../role/role.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly roleService: RoleService
  ) {
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { username: username },
      relations: {
        role: true
      }
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async deactivate(uid: number): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: uid });
    user.status = UserStatuses.DEACTIVATED;
    await this.userRepository.save(user);
    return true;
  }

  async changeStatus(username: string, newStatus: UserStatuses) {
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user)
      return false
    user.status = newStatus
    await this.userRepository.save(user);
    return true;
  }

  async createUser(userDto: CreateUserDto) {
    const exists = await this.userRepository.findOneBy({ username: userDto.username });
    if (exists)
      return { message: `User already exists` };
    const userRole = await this.roleService.findOneByUserName("Client");
    if (!userRole) {
      throw new Error("Role Client not found");
    }
    const user = this.userRepository.create({
      username: userDto.username,
      password: userDto.password,
      status: UserStatuses.ACTIVATED,
      role: userRole
    });
    return await this.userRepository.save(user);
  }
}