import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from './role.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard.t';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(...roles: string[]) {
  return applyDecorators(
    ApiBearerAuth(),
    SetMetadata('roles', roles),
    UseGuards(RolesGuard),
    UseGuards(JwtAuthGuard),
  );
}