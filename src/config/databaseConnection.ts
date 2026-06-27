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