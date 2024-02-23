import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Database from "./Database";

export interface FavoriteIngredientInterface {
  id: number;
  ingredient_id: number;
  user_id: number;
}

class FavoriteIngredient extends Database {
  static connection: Connection;

  static async createFavoriteIngredient(
    newFavoriteIngredient: FavoriteIngredientInterface
  ): Promise<ResultSetHeader> {
    if (!FavoriteIngredient.connection) {
      FavoriteIngredient.connection = await Database.getDbInstance();
      if (!FavoriteIngredient.connection) {
        throw new Error("connection not initialised");
      }
    }

    const query = `INSERT INTO ingredients_users (ingredient_id, user_id) VALUES (?, ?)`;
    const [result] =
      await FavoriteIngredient.connection.execute<ResultSetHeader>(query, [
        newFavoriteIngredient.ingredient_id,
        newFavoriteIngredient.user_id,
      ]);

    return result;
  }

  static async getFavoriteIngredients(): Promise<FavoriteIngredient[]> {
    if (!FavoriteIngredient.connection) {
      FavoriteIngredient.connection = await Database.getDbInstance();
      if (!FavoriteIngredient.connection) {
        throw new Error("connection not initialised");
      }
    }
    const query = "SELECT * FROM ingredients_users";
    const [rows] = await this.connection.execute<RowDataPacket[]>(query);

    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id,
          ingredient_id: row.ingredient_id,
          user_id: row.user_id,
        }))
      : [];
  }

  static async getFavoriteIngredientById(
    favoriteIngredientId: number
  ): Promise<FavoriteIngredient | null> {
    if (!FavoriteIngredient.connection) {
      FavoriteIngredient.connection = await Database.getDbInstance();
      if (!FavoriteIngredient.connection) {
        throw new Error("connection not initialised");
      }
    }
    const query = "SELECT * FROM ingredients_users WHERE id = ?";
    const [rows] = await this.connection.execute(query, [favoriteIngredientId]);
    if (Array.isArray(rows) && rows.length > 0) {
      const favoriteIngredientData = rows[0] as RowDataPacket;
      const favoriteIngredient: FavoriteIngredient = {
        id: favoriteIngredientData.id,
        ingredient_id: favoriteIngredientData.ingredient_id,
        user_id: favoriteIngredientData.user_id,
      };
      return favoriteIngredient;
    } else {
      return null;
    }
  }

  static async updateFavoriteIngredient(
    updatedFavoriteIngredient: FavoriteIngredientInterface,
    favoriteIngredientId: number
  ): Promise<FavoriteIngredient | null> {
    if (!FavoriteIngredient.connection) {
      FavoriteIngredient.connection = await Database.getDbInstance();
      if (!FavoriteIngredient.connection) {
        throw new Error("connection not initialised");
      }
    }
    const query =
      "UPDATE ingredients_users SET ingredient_id = ?, user_id = ? WHERE id = ?";
    const [result] =
      await FavoriteIngredient.connection.execute<ResultSetHeader>(query, [
        updatedFavoriteIngredient.ingredient_id,
        updatedFavoriteIngredient.user_id,
        favoriteIngredientId,
      ]);

    return result;
  }

  static async deleteFavoriteIngredient(
    favoriteIngredientId: number
  ): Promise<FavoriteIngredient | null> {
    if (!FavoriteIngredient.connection) {
      FavoriteIngredient.connection = await Database.getDbInstance();
      if (!FavoriteIngredient.connection) {
        throw new Error("connection not initialised");
      }
    }

    const query = "DELETE FROM ingredients_users WHERE id = ?";
    const result = await FavoriteIngredient.connection.execute(query, [
      favoriteIngredientId,
    ]);
    return result;
  }
}

export default FavoriteIngredient;
