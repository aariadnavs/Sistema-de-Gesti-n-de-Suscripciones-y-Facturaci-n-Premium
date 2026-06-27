import express, { Application } from 'express';

// Config
import { DatabaseConnection } from './config/databaseConnection';

// Models
import { PlanType } from './models/plan';

// Repositories
import { InMemoryUserRepository } from './repositories/InMemoryUserRepository';
import { InMemorySubscriptionRepository } from './repositories/InMemorySubscriptionRepository';

// Services
import { UserService } from './services/UserService';
import { SubscriptionService } from './services/SubscriptionService';
import { PaymentService } from './services/PaymentService';

// Observers
import { EmailNotificationObserver } from './observers/EmailNotificationObserver';
import { MetricsServiceObserver } from './observers/MetricsServiceObserver';
import { AccessControlObserver } from './observers/AccessControlObserver';

// Controllers
import { UserController } from './controllers/UserController';
import { SubscriptionController } from './controllers/SubscriptionController';
import { PaymentController } from './controllers/PaymentController';

// ────────────────────────────────────────────
// 1. Contenedor IoC: armado de dependencias
// ────────────────────────────────────────────

DatabaseConnection.getInstance();

const userRepository = new InMemoryUserRepository();
const subscriptionRepository = new InMemorySubscriptionRepository();

const userService = new UserService(userRepository);
const subscriptionService = new SubscriptionService(subscriptionRepository);
const paymentService = new PaymentService();

const emailObserver = new EmailNotificationObserver();
const metricsObserver = new MetricsServiceObserver();
const accessObserver = new AccessControlObserver();

paymentService.subscribe(emailObserver);
paymentService.subscribe(metricsObserver);
paymentService.subscribe(accessObserver);

const userController = new UserController(userService);
const subscriptionController = new SubscriptionController(subscriptionService);
const paymentController = new PaymentController(paymentService, userService, subscriptionService);

// ────────────────────────────────────────────
// 2. Flujo de demostración automático en consola
// ────────────────────────────────────────────

async function runDemo(): Promise<void> {
  console.log('\n=== 🚀 INICIANDO FLUJO DE DEMOSTRACIÓN ===\n');

  const user = await userService.registerUser('Ariadna Gómez', 'ariadna@example.com');
  console.log(`✅ Usuario registrado: ${user.name} (${user.id})`);

  const subscription = await subscriptionService.subscribeUserToPlan(user.id, PlanType.PREMIUM);
  console.log(`✅ Suscripción creada al plan: ${subscription.plan.name}`);

  const invoice = await paymentService.processPayment(user, subscription);
  console.log(`✅ Pago procesado. Factura #${invoice.id} generada.\n`);

  console.log('=== ✅ FIN DEL FLUJO DE DEMOSTRACIÓN ===\n');
}

// ────────────────────────────────────────────
// 3. Servidor Express
// ────────────────────────────────────────────

const app: Application = express();
app.use(express.json());

app.post('/api/users', userController.register);
app.get('/api/users', userController.getAll);
app.get('/api/users/:id', userController.getById);

app.post('/api/subscriptions', subscriptionController.subscribe);
app.get('/api/subscriptions/active/:userId', subscriptionController.getActiveByUser);
app.patch('/api/subscriptions/:id/cancel', subscriptionController.cancel);

app.post('/api/payments', paymentController.processPayment);

const PORT = process.env.PORT || 3000;

async function bootstrap(): Promise<void> {
  await runDemo();

  app.listen(PORT, () => {
    console.log(`🌐 Servidor escuchando en http://localhost:${PORT}`);
  });
}

bootstrap();