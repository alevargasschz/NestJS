import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login-input.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(@Body() loginInput: LoginInputDto) {
        return await this.authService.login(loginInput);
    }
}
