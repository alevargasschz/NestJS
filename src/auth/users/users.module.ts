import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { RolesModule } from '../roles/roles.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService, TypeOrmModule],
    imports: [TypeOrmModule.forFeature([User]), RolesModule],
})
export class UsersModule {}
