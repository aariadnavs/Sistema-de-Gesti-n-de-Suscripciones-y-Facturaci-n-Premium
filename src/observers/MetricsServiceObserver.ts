import { IObserver } from './IObserver';
import { PaymentEvent } from './PaymentEvent';

export class MetricsServiceObserver implements IObserver<PaymentEvent> {
  private totalRevenue: number = 0;
  private totalPayments: number = 0;

  public notify(data: PaymentEvent): void {
    this.totalRevenue += data.invoice.amount;
    this.totalPayments += 1;

    console.log(
      `📊 [Métricas] Pago registrado. Ingresos totales: $${this.totalRevenue} ` +
      `(${this.totalPayments} pagos procesados)`
    );
  }

  public getTotalRevenue(): number {
    return this.totalRevenue;
  }
}