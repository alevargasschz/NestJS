import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesPermissionsModule } from './roles_permissions/roles_permissions.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [UsersModule, RolesModule, PermissionsModule, RolesPermissionsModule],
})
export class AuthModule {}
