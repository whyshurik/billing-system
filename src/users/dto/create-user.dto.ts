import {IsString} from "class-validator"
import { Role } from "../../roles/role.enum";
export class CreateUserDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
}