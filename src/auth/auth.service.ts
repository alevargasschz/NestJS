import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginInputDto } from './dto/login-input.dto';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    async login(_loginInput: LoginInputDto) {
        // Verificar si el usuario existe en la base de datos
        const user = await this.usersService.findOne(_loginInput.email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(_loginInput.password, user.password);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        // Obtener permisos
        const permissions = user.role.rolePermissions.map((rp) => rp.permission.name);

        // Crear token
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role.name,
            permissions: permissions,
        };

        return this.jwtService.sign(payload);
    }
}
