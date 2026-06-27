import { randomUUID } from 'crypto';
import { ISubject } from '../observers/ISubject';
import { IObserver } from '../observers/IObserver';
import { PaymentEvent } from '../observers/PaymentEvent';
import { User } from '../models/user';
import { Subscription } from '../models/subscription';
import { Invoice, InvoiceStatus } from '../models/invoice';
import { DatabaseConnection } from '../config/databaseConnection';

export class PaymentService implements ISubject<PaymentEvent> {
  private observers: IObserver<PaymentEvent>[] = [];
  private invoices: Map<string, Invoice>;

  constructor() {
    const db = DatabaseConnection.getInstance();
    this.invoices = db.getCollection<Invoice>('invoices');
  }

  public subscribe(observer: IObserver<PaymentEvent>): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: IObserver<PaymentEvent>): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  public notifyAll(data: PaymentEvent): void {
    for (const observer of this.observers) {
      observer.notify(data);
    }
  }

  public async processPayment(
    user: User,
    subscription: Subscription
  ): Promise<Invoice> {
    const invoice = new Invoice(
      randomUUID(),
      user.id,
      subscription.id,
      subscription.plan.price,
      InvoiceStatus.PAID
    );

    this.invoices.set(invoice.id, invoice);

    this.notifyAll({ user, subscription, invoice });

    return invoice;
  }
}