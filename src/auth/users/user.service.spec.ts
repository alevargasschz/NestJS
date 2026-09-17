import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';



import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

import { UsersService } from './users.service';
import { RolesService } from '../roles/roles.service';

describe('UsersService', () => {
    let userService: UsersService;

    const mockRepository = {
        find: jest.fn(),
    };
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
        const mockedRoles: Role[] = [
            {
                id: 1,
                name: 'Admin',
                description: 'Administrator role',
                createdAt: new Date(),
                users: [],
                rolePermissions: [],
            },
        ];
        const mockedUsers: User[] = [
            {
                id: 1,
                name: 'User 1',
                email: 'user1@example.com',
                password: 'password1',
                role: mockedRoles[0],
                createdAt: new Date(),
                updatedAt: new Date(),
                routines: [],
                activityLogs: [],
            },
            {
                id: 2,
                name: 'User 2',
                email: 'user2@example.com',
                password: 'password2',
                role: mockedRoles[0],
                createdAt: new Date(),
                updatedAt: new Date(),
                routines: [],
                activityLogs: [],
            },
            {
                id: 3,
                name: 'User 3',
                email: 'user3@example.com',
                password: 'password3',
                role: mockedRoles[0],
                createdAt: new Date(),
                updatedAt: new Date(),
                routines: [],
                activityLogs: [],
            },
        ];
        mockRepository.find.mockResolvedValue(mockedUsers);

        // ACT
        const mockedUsersResult = await userService.findAll();

        //ASSERT
        expect(mockedUsersResult).toEqual(mockedUsers);
        expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
});
