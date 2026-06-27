import { IRepository } from './Irepository';
import { Subscription } from '../models/subscription';

export interface ISubscriptionRepository extends IRepository<Subscription> {
  findByUserId(userId: string): Promise<Subscription[]>;
}