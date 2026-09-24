import { CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { User } from '../entities/user.entity';

interface AuthenticatedRequest extends Request {
    user?: User;
}

export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Extraer lo que indica el @Permissions()
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());

        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true; // No se requieren permisos específicos, permitir el acceso
        }
        // Comprobar que el token este dentro del contexto
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const user = request.user;

        if (!user) throw new UnauthorizedException('User not found in context');
        // Comprobar que los permisos requeridos sean iguales o se incluyan en los entregados
        const userPermissions = user.role.rolePermissions.map((rp) => rp.permission.name);
        const hasPermission = requiredPermissions.every((perm) => userPermissions.includes(perm));
        if (!hasPermission) throw new ForbiddenException('User does not have the required permissions');
        return hasPermission;
    }
}
