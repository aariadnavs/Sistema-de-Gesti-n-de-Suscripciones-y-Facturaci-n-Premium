import { Plan, FreePlan, PremiumPlan, PlanType } from '../models/plan';

export class PlanFactory {
  public static createPlan(type: PlanType): Plan {
    switch (type) {
      case PlanType.FREE:
        return new FreePlan();
      case PlanType.PREMIUM:
        return new PremiumPlan();
      default:
        throw new Error(`Tipo de plan no soportado: ${type}`);
    }
  }
}