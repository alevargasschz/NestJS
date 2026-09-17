import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    ) {}
    async create(createUserDto: CreateUserDto) {
        const role = await this.roleService.findOne(createUserDto.roleId);
        if (!role) throw new NotFoundException(`Role with ID ${createUserDto.roleId} not found`);

        const userCreated = this.userRepository.create({
            ...createUserDto,
            role: role,
        });

        const savedUser = await this.userRepository.save(userCreated);

        return savedUser;
    }

    findAll() {
        return this.userRepository.find({
            relations: {
                role: true,
            },
        });
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    update(id: number, _updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
