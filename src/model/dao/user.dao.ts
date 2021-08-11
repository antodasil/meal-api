import { BaseDAO } from "../database";
import { v4 as uuid } from "uuid";

const TABLE = "UTILISATEUR";

export interface User {
  uuid: string;
  pseudo: string;
  mail: string;
  password: string;
  date_creat: string;
}

export class UserDAO extends BaseDAO {
  public static getInstance(): UserDAO {
    if (UserDAO.instance === undefined) {
      UserDAO.instance = new UserDAO();
    }

    return UserDAO.instance as UserDAO;
  }

  // Get a single user from an id
  async select(id: string): Promise<User> {
    // Database connection
    let connection = await this.getConnection();

    // Prepared query
    let sql =
      "select BIN_TO_UUID(uuid) as uuid, pseudo, mail, password from ?? where uuid = UUID_TO_BIN(?);";
    let params = [TABLE, id];
    sql = this.format(sql, params);

    // Execute query
    let res: Array<any> = await connection.query(sql);
    return res[0] as User;
  }

  // insert a user
  async insert(
    pseudo: string,
    mail: string,
    password: string
  ): Promise<string> {
    // Database connection
    let connection = await this.getConnection();

    // Init userId and hashed password
    let userId: string = uuid();
    let pass = this.hash(password);

    // Prepared query
    let sql = "insert into ?? values (UUID_TO_BIN(?), ?, ?, ?);";
    let params = [TABLE, userId, pseudo, mail, pass];
    sql = this.format(sql, params);

    // Execute query
    await connection.query(sql);
    return userId;
  }

  // return a User if he exist
  async exist(pseudo: string, password: string) {
    // Database connection
    const connection = await this.getConnection();

    // Init hashed password
    const pass = this.hash(password);

    // Prepared query
    let sql =
      "select BIN_TO_UUID(uuid) as uuid, pseudo, mail, password from ?? where pseudo = ? and password = ?;";
    const params = [TABLE, pseudo, pass];
    sql = this.format(sql, params);

    // Execute query
    let res: Array<any> = await connection.query(sql);
    return res[0] as User;
  }
}
