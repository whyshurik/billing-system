import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import {Response} from "express";
import { UserStatuses } from "../lib/constants";
import { UserService } from "../user/user.service";

@Controller("auth")
export class AuthController {
  constructor(private userService: UserService, private readonly authService: AuthService) {
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response) {
    const user = await this.userService.findOne(createUserDto.username)
    if (user && user.status === UserStatuses.DEACTIVATED)
      return { message: "Your account is deactivated" };
    const token = await this.authService.signIn(createUserDto);
    response.cookie("jwt", token, {
      httpOnly: true,
      secure: false, // change for production idk
      maxAge: 300000
    });
    return { message: "Successfully logged in" };
  }

}