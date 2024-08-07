import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { Role } from "../roles/role.enum";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {
  }

  async signIn({ username, password }: CreateUserDto): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const { pass, ...result } = user;
    // generate jwt and return here instead of user obj
    return result;
  }
}