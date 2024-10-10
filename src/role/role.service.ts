import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./role.entity";
import { User } from "../user/user.entity";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {
  }

  async findOneByUserName(roleName: string): Promise<Role | undefined> {
    return await this.roleRepository.findOneBy({ roleName });
  }
}