import { Module } from '@nestjs/common';
import { ConfigService } from 'node_modules/@nestjs/config/dist/config.service';
import { JwtModule } from 'node_modules/@nestjs/jwt/dist/jwt.module';
import type { StringValue } from 'ms';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesPermissionsModule } from './roles_permissions/roles_permissions.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UsersModule,
        RolesModule,
        PermissionsModule,
        RolesPermissionsModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<StringValue>('JWT_EXPIRES_IN'),
                },
            }),
        }),
    ],
})
export class AuthModule {}
