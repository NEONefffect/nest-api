import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


@Injectable()
export class RolesGuard implements CanActivate {
  
  constructor(private readonly reflector: Reflector,
    ) {}

  canActivate(context: ExecutionContext): boolean| Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string>('roles',context.getHandler());
    if (!role) {
      return true;
    }
    const req =  context.switchToHttp().getRequest();
 
    console.log('role',role,'  user',req.user)
    return true

  }
}

