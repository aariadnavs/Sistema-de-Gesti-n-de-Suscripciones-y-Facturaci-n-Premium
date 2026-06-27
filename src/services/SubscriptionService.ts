import { randomUUID } from 'crypto';
import { ISubscriptionRepository } from '../repositories/IsubscriptionRepository';
import { Subscription, SubscriptionStatus } from '../models/subscription';
import { PlanFactory } from '../factories/planFactory';
import { PlanType } from '../models/plan';

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository
  ) {}

  public async subscribeUserToPlan(
    userId: string,
    planType: PlanType
  ): Promise<Subscription> {
    const plan = PlanFactory.createPlan(planType);

    const subscription = new Subscription(randomUUID(), userId, plan);
    return this.subscriptionRepository.create(subscription);
  }

  public async getActiveSubscriptionForUser(
    userId: string
  ): Promise<Subscription | null> {
    const subscriptions = await this.subscriptionRepository.findByUserId(userId);
    return (
      subscriptions.find((sub) => sub.status === SubscriptionStatus.ACTIVE) ?? null
    );
  }

  public async cancelSubscription(subscriptionId: string): Promise<Subscription | null> {
    return this.subscriptionRepository.update(subscriptionId, {
      status: SubscriptionStatus.CANCELLED,
    });
  }
}