import { Injectable } from '@nestjs/common';

import { LoginInputDto } from './dto/login-input.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}
    async login(_loginInput: LoginInputDto) {

        // Verificar si el usuario existe en la base de datos
        const user = await this.usersService.findOne(undefined, _loginInput.email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(_loginInput.password, user.password);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        // Obtener permisos
        const permissions = user.role.permissions.map((permission) => permission.name);

        // Retornar información del usuario y permisos
        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role.name,
            },
            permissions,
        };
    }
}
