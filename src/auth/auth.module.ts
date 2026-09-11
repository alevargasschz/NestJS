import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [UsersModule, RolesModule],
})
export class AuthModule {}
