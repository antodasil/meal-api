import * as mysql from "mysql";
import * as crypto from "crypto";

export class BaseDAO {
  protected static instance: BaseDAO;

  protected constructor() {
    // Emmpty private constructor
  }

  public static getInstance(): BaseDAO {
    if (BaseDAO.instance === undefined) {
      BaseDAO.instance = new BaseDAO();
    }

    return BaseDAO.instance;
  }

  getConnection() {
    return Database.getInstance().getConnection();
  }

  format(sql: string, data: any[]): string {
    return mysql.format(sql, data);
  }

  hash(str: string): string {
    return crypto
      .createHmac("sha256", process.env.PASSWORD_SECRET_KEY as string)
      .update(str)
      .digest("hex");
  }
}

export class DatabaseConnection {
  private connection: mysql.Connection;

  constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  async query(sql: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve(undefined);
      });
    });
  }
}

export class Database {
  private connectionPool: mysql.Pool;
  private static instance: Database;

  private constructor() {
    this.connectionPool = mysql.createPool({
      connectionLimit: Number.parseInt(
        process.env.DATABASE_MAX_CONNECTIONS || "5"
      ),
      host: process.env.DATABASE_HOST,
      port: Number.parseInt(process.env.DATABASE_PORT || "3306"),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_SCHEMA,
    });
  }

  static getInstance(): Database {
    if (Database.instance === undefined) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  async getConnection(): Promise<DatabaseConnection> {
    let newConnection: mysql.Connection = await new Promise(
      (resolve, reject) => {
        this.connectionPool.getConnection(
          (err, connection: mysql.Connection) => {
            if (err) return reject(err);
            resolve(connection);
          }
        );
      }
    );
    return new DatabaseConnection(newConnection);
  }

  async release(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connectionPool.end((err) => {
        if (err) return reject(err);
        resolve(undefined);
      });
    });
  }
}
