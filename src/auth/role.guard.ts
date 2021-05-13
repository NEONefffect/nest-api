import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './role.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
  
  constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) return true;
      const req = context.switchToHttp().getRequest();
      return requiredRoles.some((role) => req?.user?.role?.includes(role));
      
    }
}

