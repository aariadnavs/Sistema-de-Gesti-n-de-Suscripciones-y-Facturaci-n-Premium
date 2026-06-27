import { User } from '../models/user';
import { Subscription } from '../models/subscription';
import { Invoice } from '../models/invoice';

export interface PaymentEvent {
  user: User;
  subscription: Subscription;
  invoice: Invoice;
}