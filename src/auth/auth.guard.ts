import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Request} from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('token:', token);
    if (!token) {
      throw new UnauthorizedException('bebriq');
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
    } catch {
      throw new UnauthorizedException('zxcursed');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(request.headers)
    console.log('---');
    console.log(request.headers.authorization?.split(' '))
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    console.log(type)
    console.log(token)
    return type === 'Bearer' ? token : undefined;
  }
}