import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { RolesService } from '../roles/roles.service';
import { User } from '../entities/user.entity';

import { UsersService } from './users.service';

describe('UsersService', () => {
    let userService: UsersService;

    const mockRepository = {};
    const mockRoleService = {};

    beforeEach(async () => {
        jest.clearAllMocks(); // por cada prueba limpia los mocks para que no se acumulen

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService, // no estara mockeado
                { provide: getRepositoryToken(User), useValue: mockRepository }, // estara mockeado
                { provide: RolesService, useValue: mockRoleService }, // estara mockeado
            ],
        }).compile();

        userService = module.get<UsersService>(UsersService);
    });

    it('should work the service', () => {
        expect(userService).toBeDefined();
    });

    it('should return all users with roles', async () => {
        // PREPARACION - ARRANGE
        const mockedUsers = [
            {
                id: 1,
                name: 'User 1',
                email: 'user1@example.com',
                password: 'password1',
                role: {
                    id: 1,
                    name: 'Admin'
                },
                createdAt: new Date(),
            }
        ]
        // 
        
    });
});
