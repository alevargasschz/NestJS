import { Injectable } from '@nestjs/common';

import { LoginInputDto } from './dto/login-input.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}
    async login(_loginInput: LoginInputDto) {
        this,usersService
    }
}
