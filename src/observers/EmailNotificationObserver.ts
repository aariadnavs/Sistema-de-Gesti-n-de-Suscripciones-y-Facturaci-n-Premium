import { IObserver } from './IObserver';
import { PaymentEvent } from './PaymentEvent';

export class EmailNotificationObserver implements IObserver<PaymentEvent> {
  public notify(data: PaymentEvent): void {
    console.log(
      `📧 [Email] Enviando factura a ${data.user.email}: ` +
      `Factura #${data.invoice.id} por $${data.invoice.amount} (Plan ${data.subscription.plan.name})`
    );
  }
}