import { Plan } from './plan';

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export class Subscription {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly plan: Plan,
    public status: SubscriptionStatus = SubscriptionStatus.ACTIVE,
    public readonly startDate: Date = new Date()
  ) {}
}