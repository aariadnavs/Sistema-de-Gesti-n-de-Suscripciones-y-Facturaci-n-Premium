# Diagrama de clases UML — Sistema de Gestión de Suscripciones y Facturación Premium

Este diagrama muestra cómo interactúan los 5 patrones de diseño implementados:

- **Singleton**: `DatabaseConnection`
- **Factory Method**: `PlanFactory`
- **Repository**: `IRepository`, `IUserRepository`, `ISubscriptionRepository` + sus implementaciones en memoria
- **Observer**: `ISubject`, `IObserver` + `PaymentService` (Subject) y sus 3 Observers concretos
- **MVC**: `Controllers` → `Services` → `Repositories`/`Models`

> GitHub renderiza automáticamente el bloque `mermaid` de abajo al ver este archivo en el repositorio — no hace falta exportar una imagen aparte.

```mermaid
classDiagram
    class DatabaseConnection {
        <<Singleton>>
        +getInstance() DatabaseConnection
        +getCollection(name) Map
    }

    class IRepository {
        <<interface>>
        +create(item)
        +findById(id)
        +findAll()
        +update(id, item)
        +delete(id)
    }
    class IUserRepository {
        <<interface>>
        +findByEmail(email)
    }
    class ISubscriptionRepository {
        <<interface>>
        +findByUserId(userId)
    }
    class InMemoryUserRepository
    class InMemorySubscriptionRepository

    class Plan {
        <<abstract>>
        +name
        +price
        +getFeatures()
        +grantsPremiumAccess()
    }
    class FreePlan
    class PremiumPlan
    class PlanFactory {
        +createPlan(type) Plan
    }

    class User
    class Subscription
    class Invoice

    class IObserver {
        <<interface>>
        +notify(data)
    }
    class ISubject {
        <<interface>>
        +subscribe(observer)
        +unsubscribe(observer)
        +notifyAll(data)
    }
    class EmailNotificationObserver
    class MetricsServiceObserver
    class AccessControlObserver

    class UserService {
        +registerUser(name, email)
    }
    class SubscriptionService {
        +subscribeUserToPlan(userId, planType)
    }
    class PaymentService {
        +processPayment(user, subscription)
    }

    class UserController
    class SubscriptionController
    class PaymentController

    IRepository <|-- IUserRepository
    IRepository <|-- ISubscriptionRepository
    IUserRepository <|.. InMemoryUserRepository
    ISubscriptionRepository <|.. InMemorySubscriptionRepository
    InMemoryUserRepository ..> DatabaseConnection
    InMemorySubscriptionRepository ..> DatabaseConnection
    PaymentService ..> DatabaseConnection

    Plan <|-- FreePlan
    Plan <|-- PremiumPlan
    PlanFactory ..> Plan : crea
    Subscription *-- Plan

    IObserver <|.. EmailNotificationObserver
    IObserver <|.. MetricsServiceObserver
    IObserver <|.. AccessControlObserver
    ISubject <|.. PaymentService
    PaymentService o-- IObserver : notifica a

    UserService ..> IUserRepository
    SubscriptionService ..> ISubscriptionRepository
    SubscriptionService ..> PlanFactory

    UserController ..> UserService
    SubscriptionController ..> SubscriptionService
    PaymentController ..> PaymentService
    PaymentController ..> UserService
    PaymentController ..> SubscriptionService

    PaymentService ..> Invoice : crea
    PaymentService ..> User
    PaymentService ..> Subscription
```
