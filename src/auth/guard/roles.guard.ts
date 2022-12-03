import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorator/role.decorator';
import { Role } from '../../users/model/user.role';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRole) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        console.log(444, user, requiredRole)
        return requiredRole === user.role;
    }
}