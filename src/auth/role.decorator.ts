
import { SetMetadata } from '@nestjs/common';

 const Role = [
    'Admin',
    "User"
]

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);