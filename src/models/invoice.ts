export enum InvoiceStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

export class Invoice {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly subscriptionId: string,
    public readonly amount: number,
    public readonly status: InvoiceStatus = InvoiceStatus.PAID,
    public readonly issuedAt: Date = new Date()
  ) {}
}