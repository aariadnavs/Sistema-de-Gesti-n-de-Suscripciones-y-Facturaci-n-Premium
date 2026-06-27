import { Request, Response } from 'express';
import { SubscriptionService } from '../services/SubscriptionService';
import { PlanType } from '../models/plan';

export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  public subscribe = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, planType } = req.body;

      if (!userId || !planType) {
        res.status(400).json({ error: 'Los campos userId y planType son obligatorios.' });
        return;
      }

      if (!Object.values(PlanType).includes(planType)) {
        res.status(400).json({
          error: `planType inválido. Valores permitidos: ${Object.values(PlanType).join(', ')}`,
        });
        return;
      }

      const subscription = await this.subscriptionService.subscribeUserToPlan(userId, planType);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public getActiveByUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const subscription = await this.subscriptionService.getActiveSubscriptionForUser(userId);

    if (!subscription) {
      res.status(404).json({ error: `El usuario ${userId} no tiene una suscripción activa.` });
      return;
    }

    res.status(200).json(subscription);
  };

  public cancel = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const subscription = await this.subscriptionService.cancelSubscription(id);

    if (!subscription) {
      res.status(404).json({ error: `No se encontró una suscripción con id ${id}` });
      return;
    }

    res.status(200).json(subscription);
  };
}