import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Put, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "../auth/auth.guard";
import { AdminRoles, UserStatuses } from "../lib/constants";
import { RoleGuard } from "../role/role.guard";
import { Roles } from "../role/role.decorator";
import { User } from "./user.entity";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @UseGuards(AuthGuard)
  @Roles(AdminRoles.Admin)
  @Get("profile")
  async getProfile(@Request() req) {
    console.log("HAHAHAHAHAHAHHA");
    return await req.user;
  }

  @UseGuards(AuthGuard)
  @Patch("deactivate")
  async deactivateAccount(@Request() req) {
    const newStatus = UserStatuses.DEACTIVATED;
    console.log(req.user);
    const result = await this.userService.changeStatus(req.user.username, newStatus);
    if (result === false)
      return { message: `User doesn't exist` };
    else
      return { message: `User ${req.user.username} deactivated` };
  }

  @UseGuards(AuthGuard)
  @Roles(AdminRoles.Admin)
  @Get("get-user")
  async getUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const result = await this.userService.findOne(createUserDto.username);
    console.log(result);
    return result;
  }

  @UseGuards(AuthGuard)
  @Roles(AdminRoles.Admin)
  @Get("get-all-users")
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Roles(AdminRoles.Admin)
  @Patch("block")
  async blockUser(@Body() createUserDto: CreateUserDto) {
    const newStatus = UserStatuses.BLOCKED;
    const result = await this.userService.changeStatus(createUserDto.username, newStatus);
    if (!result)
      return { message: `User doesn't exist` };
    return { message: `User ${createUserDto.username} blocked` };
  }

  @UseGuards(AuthGuard)
  @Roles(AdminRoles.Admin)
  @Patch("unblock")
  async unblockUser(@Body() createUserDto: CreateUserDto) {
    const newStatus = UserStatuses.ACTIVATED
    const result = await this.userService.changeStatus(createUserDto.username, newStatus);
    if (!result)
      return { message: `User doesn't exist` };
    return { message: `User ${createUserDto.username} unblocked` };
  }

  @HttpCode(HttpStatus.OK)
  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}