import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() createUserDto: CreateUserDto) {
    return this.authService.signIn(createUserDto)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}