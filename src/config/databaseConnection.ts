export class DatabaseConnection {
  private static instance: DatabaseConnection;

  private store: Map<string, Map<string, any>> = new Map();

  private constructor() {
    console.log('🔌 Conexión a la base de datos (en memoria) establecida.');
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public getCollection<T>(name: string): Map<string, T> {
    if (!this.store.has(name)) {
      this.store.set(name, new Map());
    }
    return this.store.get(name) as Map<string, T>;
  }
}

// Prueba en main.ts de que el código corre bien

const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true → es el mismo objeto en memoria