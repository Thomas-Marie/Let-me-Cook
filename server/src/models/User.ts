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

  static async createUser(newUser: UserInterface): Promise<ResultSetHeader> {
    await Database.checkDatabaseConnection();
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const [result] = await User.connection.execute<ResultSetHeader>(query, [
      newUser.username,
      newUser.email,
      newUser.password,
    ]);

    return result;
  }

  static async getUsers(): Promise<User[]> {
    await Database.checkDatabaseConnection();
    const query = "SELECT * FROM users";
    const [rows] = await this.connection.execute<RowDataPacket[]>(query);

    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id,
          username: row.username,
          email: row.email,
          password: row.password,
        }))
      : [];
  }

  static async getUserById(userId: number): Promise<User | null> {
    await Database.checkDatabaseConnection();
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await this.connection.execute(query, [userId]);
    if (Array.isArray(rows) && rows.length > 0) {
      const userData = rows[0] as RowDataPacket;
      const user: User = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        password: userData.password,
      };

      return user;
    } else {
      return null;
    }
  }

  static async updateUser(
    updatedUser: UserInterface,
    userId: number
  ): Promise<User | null> {
    await Database.checkDatabaseConnection();
    const query =
      "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
    const [result] = await User.connection.execute<ResultSetHeader>(query, [
      updatedUser.username,
      updatedUser.email,
      updatedUser.password,
      userId,
    ]);

    return result;
  }

  static async deleteUser(userId: number): Promise<User | null> {
    await Database.checkDatabaseConnection();
    const query = "DELETE FROM users WHERE id = ?";
    const result = await User.connection.execute(query, [userId]);

    return result;
  }
}

export default User;
