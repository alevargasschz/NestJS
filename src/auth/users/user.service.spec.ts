import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { RolesService } from '../roles/roles.service';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
    let userService: UsersService;

    const mockRepository = {
        find: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    };
    const mockRoleService = {
        findOne: jest.fn(),
    };

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
        expect(mockRepository.find).toHaveBeenCalledWith({
            relations: {
                role: true,
            },
        });
    });

    it('should create a new user', async () => {
        // PREPARACION - ARRANGE
        const createUserDto: CreateUserDto = {
            username: 'User 1',
            email: 'user1@example.com',
            password: 'password1',
            roleId: 1,
        };
        const mockedRole: Role = {
            id: 1,
            name: 'Admin',
            description: 'Administrator role',
            createdAt: new Date(),
            users: [],
            rolePermissions: [],
        };
        const mockedUser: User = {
            id: 1,
            name: 'User 1',
            email: 'user1@example.com',
            password: 'password1',
            role: mockedRole,
            createdAt: new Date(),
            updatedAt: new Date(),
            routines: [],
            activityLogs: [],
        };
        mockRoleService.findOne.mockReturnValue(mockedRole);
        mockRepository.create.mockResolvedValue(mockedUser);
        mockRepository.save.mockResolvedValue(mockedUser);

        // ACT
        const createdUser = await userService.create(createUserDto);

        // ASSERT
        expect(createdUser).toEqual(mockedUser);
        expect(mockRoleService.findOne).toHaveBeenCalledTimes(1);
        expect(mockRoleService.findOne).toHaveBeenCalledWith(createUserDto.roleId);
        expect(mockRepository.create).toHaveBeenCalledTimes(1);
        expect(mockRepository.create).toHaveBeenCalledWith({
            ...createUserDto,
            role: mockedRole,
        });
        expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
});
