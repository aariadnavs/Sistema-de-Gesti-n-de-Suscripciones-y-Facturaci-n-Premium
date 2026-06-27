import { ISubscriptionRepository } from './IsubscriptionRepository';
import { Subscription } from '../models/subscription';
import { DatabaseConnection } from '../config/DatabaseConnection';

export class InMemorySubscriptionRepository implements ISubscriptionRepository {
  private subscriptions: Map<string, Subscription>;

  constructor() {
    const db = DatabaseConnection.getInstance();
    this.subscriptions = db.getCollection<Subscription>('subscriptions');
  }

  public async create(item: Subscription): Promise<Subscription> {
    this.subscriptions.set(item.id, item);
    return item;
  }

  public async findById(id: string): Promise<Subscription | null> {
    return this.subscriptions.get(id) ?? null;
  }

  public async findAll(): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values());
  }

  public async update(id: string, item: Partial<Subscription>): Promise<Subscription | null> {
    const existing = this.subscriptions.get(id);
    if (!existing) {
      return null;
    }
    const updated = Object.assign(existing, item);
    this.subscriptions.set(id, updated);
    return updated;
  }

  public async delete(id: string): Promise<boolean> {
    return this.subscriptions.delete(id);
  }

  public async findByUserId(userId: string): Promise<Subscription[]> {
    const all = Array.from(this.subscriptions.values());
    return all.filter((sub) => sub.userId === userId);
  }
}