import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./role.decorator";
import { AdminRoles } from "../lib/constants";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AdminRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    const { user } = context.switchToHttp().getRequest();
    console.log(user)
    if (!user || !requiredRoles.some((role) => role.toLowerCase() === user.role.roleName.toLowerCase())) {
      throw new UnauthorizedException('You do not have the required roles');
    }
    return true;
  }

}
