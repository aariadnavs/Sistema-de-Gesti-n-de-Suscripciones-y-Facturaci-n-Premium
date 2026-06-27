import { randomUUID } from 'crypto';
import { IUserRepository } from '../repositories/IuserRepository';
import { User } from '../models/user';

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async registerUser(name: string, email: string): Promise<User> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error(`Ya existe un usuario registrado con el email ${email}`);
    }

    const user = new User(randomUUID(), name, email);
    return this.userRepository.create(user);
  }

  public async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}