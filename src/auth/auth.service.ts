import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { Role } from "../roles/role.enum";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {
  }

  async signIn({ username, password }: CreateUserDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const data = { subset: user.userId, username: user.username };
    // generate jwt and return here instead of user obj
    return {
      access_token: this.jwtService.sign(data),
    }
  }
}