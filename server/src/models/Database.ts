import mysql, { Connection, createConnection } from "mysql2/promise";

abstract class Database {
  protected static dbInstance: Connection;
  static connection: Connection;

  public static async getDbInstance(): Promise<Connection> {
    if (this.dbInstance) {
      return this.dbInstance;
    }
    try {
      this.dbInstance = await mysql.createConnection({
        host: "bprgnsotcrxvwrejm6z0-mysql.services.clever-cloud.com",
        database: "bprgnsotcrxvwrejm6z0",
        user: "uabaexmpefa579gr",
        password: "GpIMVocPwQYSAchVQ3Wv",
      });

      console.log("Database connection ✅");
      return this.dbInstance;
    } catch (error) {
      console.error("Erreur lors de la connexion à la db");
      throw error;
    }
  }

  public static async get(sql: string, params: any[] = []): Promise<any> {
    try {
      const connection = await this.getDbInstance();
      const [row] = await connection.execute(sql, params);
      return row;
    } catch (error) {
      throw error;
    }
  }

  static async checkDatabaseConnection() {
    if (!Database.connection) {
      Database.connection = await Database.getDbInstance();
      if (!Database.connection) {
        throw new Error("connection not initialised");
      }
    }
  }
}

export default Database;
