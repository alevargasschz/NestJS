import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { RoleNotFoundException, UserNotFoundException } from '../../common/exceptions';
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

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { roleId, ...userData } = createUserDto;
        const role = await this.roleService.findOne(roleId);
        if (!role) {
            throw new RoleNotFoundException(roleId);
        }

        // pass123 - $20A$561201asad
        const passwordHashed = await bcrypt.hash(
            createUserDto.password,
            this.configService.get<number>('SALT_QTY') ?? 1,
        );

        const user = this.userRepository.create({
            ...userData,
            password: passwordHashed,
            role,
        });
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({
            relations: { role: true },
        });
    }

    async findOne(identifier: string | number, relations: boolean = false): Promise<User> {
        const where = typeof identifier === 'number' ? { id: identifier } : { email: identifier };
        const user = await this.userRepository.findOne({
            where,
            relations: relations
                ? {
                      role: {
                          rolePermissions: {
                              permission: true,
                          },
                      },
                  }
                : undefined,
        });
        if (!user) {
            throw new UserNotFoundException(identifier);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        const { roleId, ...userData } = updateUserDto;

        if (roleId !== undefined) {
            const role = await this.roleService.findOne(roleId);
            if (!role) {
                throw new RoleNotFoundException(roleId);
            }
            user.role = role;
        }

        this.userRepository.merge(user, userData);
        return await this.userRepository.save(user);
    }

    async remove(id: number): Promise<{ message: string }> {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
        return { message: `User with id #${id} deleted successfully` };
    }
}
