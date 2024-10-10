import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Request} from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['jwt'];
    if (!token) {
      throw new UnauthorizedException('token is undefined');
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(
        token.access_token,
        {
          secret: jwtConstants.secret
        }
      );
    } catch {
      throw new UnauthorizedException('token is not verified');
    }
    return true;

  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined;
  }
}