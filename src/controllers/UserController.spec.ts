import { UserController } from "./UserController";
import { UserService } from '../services/UserService';
import { Request } from 'express';
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn().mockReturnValue([
            { name: 'Max', email: 'max@test.com' }
        ]),
        deleteUser: jest.fn((email: string) => {
            if (email !== 'max@test.com') {
                throw new Error('Usuário não encontrado');
            }
        })
    };

    const userController = new UserController(mockUserService as UserService);

    it('Deve deletar um usuário existente', () => {
        const mockRequest = {
            params: { email: 'max@test.com' }
        } as Partial<Request>;
        const mockResponse = makeMockResponse();

        userController.deleteUser(mockRequest as Request, mockResponse);

        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' });
        expect(mockUserService.deleteUser).toHaveBeenCalledWith('max@test.com');
    });

    it('Deve retornar erro caso o nome não seja informado', () => {
        const mockRequest = {
            body: {
                email: 'no-name@test.com',
            },
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: Nome obrigatório' });
    });

    it('Deve retornar erro caso o email não seja informado', () => {
        const mockRequest = {
            body: {
                name: 'Max',
            },
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: Email obrigatório' });
    });

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Max',
                email: 'Max@test.com',
            },
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' });
    });

    it('Deve chamar a função getAllUsers', () => {
        const mockRequest = {} as Request;
        const mockResponse = makeMockResponse();

        userController.getAllUsers(mockRequest, mockResponse);
        expect(mockUserService.getAllUsers).toHaveBeenCalled();
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject([
            { name: 'Max', email: 'max@test.com' },
        ]);
    });
});
