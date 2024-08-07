import { Role } from "../roles/role.enum";

type User = {
  id: number,
  username: string,
  password: string,
  role: Role
}