import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private readonly userService: UserService) {}

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        res.status(400).json({ error: 'Los campos name y email son obligatorios.' });
        return;
      }

      const user = await this.userService.registerUser(name, email);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);

    if (!user) {
      res.status(404).json({ error: `No se encontró un usuario con id ${id}` });
      return;
    }

    res.status(200).json(user);
  };

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const users = await this.userService.getAllUsers();
    res.status(200).json(users);
  };
}