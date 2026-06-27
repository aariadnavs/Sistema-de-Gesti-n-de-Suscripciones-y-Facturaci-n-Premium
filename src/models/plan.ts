export enum PlanType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

export abstract class Plan {
  constructor(
    public readonly name: string,
    public readonly price: number
  ) {}

  public abstract getFeatures(): string[];

  public abstract grantsPremiumAccess(): boolean;
}

export class FreePlan extends Plan {
  constructor() {
    super('Free', 0);
  }

  public getFeatures(): string[] {
    return ['Acceso básico', 'Soporte por email', 'Hasta 3 proyectos activos'];
  }

  public grantsPremiumAccess(): boolean {
    return false;
  }
}

export class PremiumPlan extends Plan {
  constructor() {
    super('Premium', 999);
  }

  public getFeatures(): string[] {
    return [
      'Acceso ilimitado',
      'Soporte prioritario 24/7',
      'Proyectos ilimitados',
      'Estadísticas avanzadas',
    ];
  }

  public grantsPremiumAccess(): boolean {
    return true;
  }
}