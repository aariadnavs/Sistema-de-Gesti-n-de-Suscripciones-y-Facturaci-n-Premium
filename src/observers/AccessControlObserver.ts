import { IObserver } from './IObserver';
import { PaymentEvent } from './PaymentEvent';

export class AccessControlObserver implements IObserver<PaymentEvent> {
  public notify(data: PaymentEvent): void {
    const hasPremiumAccess = data.subscription.plan.grantsPremiumAccess();

    if (hasPremiumAccess) {
      console.log(
        `🔓 [Accesos] Usuario ${data.user.name} ahora tiene acceso PREMIUM activado.`
      );
    } else {
      console.log(
        `🔒 [Accesos] Usuario ${data.user.name} tiene acceso de plan ${data.subscription.plan.name}.`
      );
    }
  }
}