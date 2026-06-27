import { Request, Response } from 'express';
import { PaymentService } from '../services/PaymentService';
import { UserService } from '../services/UserService';
import { SubscriptionService } from '../services/SubscriptionService';

export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly userService: UserService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  public processPayment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.body;

      if (!userId) {
        res.status(400).json({ error: 'El campo userId es obligatorio.' });
        return;
      }

      const user = await this.userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: `No se encontró un usuario con id ${userId}` });
        return;
      }

      const subscription = await this.subscriptionService.getActiveSubscriptionForUser(userId);
      if (!subscription) {
        res.status(400).json({
          error: `El usuario ${userId} no tiene una suscripción activa para pagar.`,
        });
        return;
      }

      const invoice = await this.paymentService.processPayment(user, subscription);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}