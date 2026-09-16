import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesModule } from '../roles/roles.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [],
    imports: [TypeOrmModule.forFeature([User]), RolesModule],
})
export class UsersModule {}
