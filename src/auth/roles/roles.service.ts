import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities/role.entity';

import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}
    async create(createRoleDto: CreateRoleDto) {
        // Mapeo de DTO a entidad Role
        const roleEntity = this.roleRepository.create({
            name: createRoleDto.roleName,
            description: createRoleDto.description,
        });
        // Guardar la entidad Role en la base de datos
        const savedRole = await this.roleRepository.save(roleEntity);
        return savedRole;
    }

    findAll() {
        return this.roleRepository.find();
    }

    findOne(id: number) {
        return this.roleRepository.findOne({ where: { id } });
    }

    update(id: number, _updateRoleDto: UpdateRoleDto) {
        return `This action updates a #${id} role`;
    }

    remove(id: number) {
        return `This action removes a #${id} role`;
    }
    findOneByName(name: string) {
        return this.roleRepository.findOne({ where: { name } });
    }
}
