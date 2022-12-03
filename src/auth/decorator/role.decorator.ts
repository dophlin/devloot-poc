import { SetMetadata } from '@nestjs/common';
import { Role } from '../../users/model/user.role';

export const ROLE_KEY = 'role';
export const UseRole = (role: Role) => SetMetadata(ROLE_KEY, role);