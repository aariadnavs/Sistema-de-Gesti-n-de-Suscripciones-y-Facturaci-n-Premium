import { IUserRepository } from './IuserRepository';
import { User } from '../models/user';
import { DatabaseConnection } from '../config/DatabaseConnection';

export class InMemoryUserRepository implements IUserRepository {
  private users: Map<string, User>;

  constructor() {
    const db = DatabaseConnection.getInstance();
    this.users = db.getCollection<User>('users');
  }

  public async create(item: User): Promise<User> {
    this.users.set(item.id, item);
    return item;
  }

  public async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  public async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  public async update(id: string, item: Partial<User>): Promise<User | null> {
    const existing = this.users.get(id);
    if (!existing) {
      return null;
    }
    const updated = Object.assign(existing, item);
    this.users.set(id, updated);
    return updated;
  }

  public async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const all = Array.from(this.users.values());
    return all.find((user) => user.email === email) ?? null;
  }
}