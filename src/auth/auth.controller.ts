import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login-input.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from './users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post()
    async login(@Body() loginInput: LoginInputDto) {
        return await this.authService.login(loginInput);
    }
}
