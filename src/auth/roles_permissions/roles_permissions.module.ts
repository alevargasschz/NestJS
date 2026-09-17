import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesPermissionsService } from './roles_permissions.service';
import { RolesPermissionsController } from './roles_permissions.controller';
import { RolePermissions } from '../entities/role_permissions.entity';

@Module({
  controllers: [RolesPermissionsController],
  providers: [RolesPermissionsService],
  imports: [TypeOrmModule.forFeature([RolePermissions])],
  exports: [TypeOrmModule],
})
export class RolesPermissionsModule {}
