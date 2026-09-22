import { NotFoundException } from '@nestjs/common';

/**
 * Excepción personalizada lanzada cuando un usuario no existe en la base de datos.
 */
export class UserNotFoundException extends NotFoundException {
    constructor(userId: number | string, internalCode?: string) {
        super({
            error: 'User Not Found',
            message: `El usuario con identificador ${userId} no fue encontrado.`,
            code: internalCode,
        });
    }
}
