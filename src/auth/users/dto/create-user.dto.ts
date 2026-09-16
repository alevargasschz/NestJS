import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'Username must be a string' })
    username!: string;
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email!: string;
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string;
    @IsNotEmpty({ message: 'Role ID cannot be empty' })
    roleId!: number;
}
