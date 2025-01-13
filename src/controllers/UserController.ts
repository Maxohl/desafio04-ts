import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    userService: UserService;

    constructor(userService = new UserService()) {
        this.userService = userService;
    }

    createUser = (req: Request, res: Response) => {
        const { name, email } = req.body;

        if (!name) {
            res.status(400).json({ message: 'Bad request: Nome obrigatório' });
        }

        if (!email) {
            res.status(400).json({ message: 'Bad request: Email obrigatório' });
        }

        this.userService.createUser(name, email);
        res.status(201).json({ message: 'Usuário criado' });
    };

    deleteUser = (req: Request, res: Response) => {
        const { email } = req.params;
    
        if (!email) {
            res.status(400).json({ message: 'Bad request: Email obrigatório' });
        }
    
        try {
            this.userService.deleteUser(email);
            res.status(200).json({ message: 'Usuário deletado' });
        } catch (error) {
            res.status(404).json({ message: 'Error' });
        }
    };

    getAllUsers = (req: Request, res: Response) => {
        const users = this.userService.getAllUsers();
        res.status(200).json(users);
    };
}
