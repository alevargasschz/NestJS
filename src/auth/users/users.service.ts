import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from 'node_modules/@nestjs/config/dist/config.service';

import { UserNotFoundException } from 'src/common/exceptions/http/user-not-found.exception';

import { User } from '../entities/user.entity';
import { RolesService } from '../roles/roles.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RolesService,
        private readonly configService: ConfigService,
    ) {}
    async create(createUserDto: CreateUserDto) {
        const role = await this.roleService.findOne(createUserDto.roleId);
        if (!role) throw new NotFoundException(`Role with ID ${createUserDto.roleId} not found`);

        const hashedPassword = await bcrypt.hash(
            createUserDto.password,
            this.configService.get<number>('SALT_QTY') || 10,
        );
        const userCreated = this.userRepository.create({
            ...createUserDto,
            role: role,
            password: hashedPassword,
        });

        const savedUser = await this.userRepository.save(userCreated);

        return savedUser;
    }

    async findAll() {
        return this.userRepository.find({
            relations: {
                role: true,
            },
        });
    }

    async findOne(id?: number, email?: string) {
        const identifier = id ?? email;

        const user = await this.userRepository.findOne({
            where: {
                id: id,
                email: email,
            },
            relations: {
                role: {
                    rolePermissions: true,
                },
            },
        });
        if (!user) throw new UserNotFoundException(identifier ?? 'unknown');
        return user;
    }

    async update(id: number, _updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);

        const updatedUser = await this.userRepository.save({
            ...user,
            ..._updateUserDto,
        });

        return updatedUser;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
