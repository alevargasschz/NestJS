import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from 'node_modules/@nestjs/config/dist/config.service';

import { UsersService } from '../users/users.service';
import { JwtPayload } from '../interface/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) throw new Error('JWT_SECRET is not defined in the environment variables');
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    // Comprobar que el usuario del token si existe en el sistema
    async validate(payload: JwtPayload) {
        // Bucamos al usuario y lo mantenemos en el contexto
        // Recargar las relaciones que consume PermissionsGuard.
        const user = await this.usersService.findOne(payload.sub, true);

        if (!user) throw new UnauthorizedException('Usuario no encontrado');
        return user;
    }
}
