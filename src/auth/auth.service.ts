import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {
  }

  async signIn({ username, password }: CreateUserDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);
    if (!user ||  user?.password !== password) {
      throw new UnauthorizedException('Wrong username or password', {cause: new Error(), description: 'Wrong username or password'});
    }
    console.log(user)
    // generate jwt and return here instead of user obj
    return {
      access_token: this.jwtService.sign({uid: user.id, username: user.username, role: user.role}, {expiresIn: '20m'}),
    }
  }

}