import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Database from "./Database";

export interface UserInterface {
  id: number;
  username: string;
  email: string;
  password: string;
}

class User extends Database {
  static connection: Connection;

  static initialize(connection: Connection): void {
    User.connection = connection;
  }

  static async getUsersById(userId: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await this.connection.execute(query, [userId]);
    if (Array.isArray(rows) && rows.length > 0) {
      const userData = rows[0] as RowDataPacket;
      const user: User = {
        user_id: userData.id,
        username: userData.username,
        email: userData.email,
        password_hash: userData.password_hash,
      };
      return user;
    } else {
      return null;
    }
  }

  static async getUsers(): Promise<User[]> {
    const query = "SELECT * FROM users";
    const [rows] = await this.connection.execute<RowDataPacket[]>(query);

    return Array.isArray(rows)
      ? rows.map((row) => ({
          user_id: row.id,
          username: row.username,
          email: row.email,
          password_hash: row.password_hash,
        }))
      : [];
  }

  static async createUser(newUser: UserInterface): Promise<ResultSetHeader> {
    console.log("newUser:", newUser);

    if (!User.connection) {
      User.connection = await Database.getDbInstance();
      if (!User.connection) {
        throw new Error("connection not initialised");
      }
    }

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const [result] = await User.connection.execute<ResultSetHeader>(query, [
      newUser.username,
      newUser.email,
      newUser.password,
    ]);

    return result;
  }
}

export default User;
