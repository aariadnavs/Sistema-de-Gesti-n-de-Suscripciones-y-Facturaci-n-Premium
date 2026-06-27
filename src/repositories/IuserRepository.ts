import { IRepository } from './Irepository';
import { User } from '../models/user';

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}