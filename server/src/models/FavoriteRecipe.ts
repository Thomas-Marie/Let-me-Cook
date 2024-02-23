import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Database from "./Database";

export interface FavoriteRecipeInterface {
  id: number;
  recipe_id: number;
  user_id: number;
}

class FavoriteRecipe extends Database {
  static connection: Connection;

  static async createFavoriteRecipe(
    newFavoriteRecipe: FavoriteRecipeInterface
  ): Promise<ResultSetHeader> {
    if (!FavoriteRecipe.connection) {
      FavoriteRecipe.connection = await Database.getDbInstance();
      if (!FavoriteRecipe.connection) {
        throw new Error("connection not initialised");
      }
    }

    const query = `INSERT INTO recipes_users (recipe_id, user_id) VALUES (?, ?)`;
    const [result] = await FavoriteRecipe.connection.execute<ResultSetHeader>(
      query,
      [newFavoriteRecipe.recipe_id, newFavoriteRecipe.user_id]
    );

    return result;
  }

  static async getFavoriteRecipes(): Promise<FavoriteRecipe[]> {
    if (!FavoriteRecipe.connection) {
      FavoriteRecipe.connection = await Database.getDbInstance();
      if (!FavoriteRecipe.connection) {
        throw new Error("connection not initialised");
      }
    }
    const query = "SELECT * FROM recipes_users";
    const [rows] = await this.connection.execute<RowDataPacket[]>(query);

    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id,
          recipe_id: row.recipe_id,
          user_id: row.user_id,
        }))
      : [];
  }

  static async getFavoriteRecipeById(
    favoriteRecipeId: number
  ): Promise<FavoriteRecipe | null> {
    if (!FavoriteRecipe.connection) {
      FavoriteRecipe.connection = await Database.getDbInstance();
      if (!FavoriteRecipe.connection) {
        throw new Error("connection not initialised");
      }
    }
    const query = "SELECT * FROM recipes_users WHERE id = ?";
    const [rows] = await this.connection.execute(query, [favoriteRecipeId]);
    if (Array.isArray(rows) && rows.length > 0) {
      const favoriteRecipeData = rows[0] as RowDataPacket;
      const favoriteRecipe: FavoriteRecipe = {
        id: favoriteRecipeData.id,
        recipe_id: favoriteRecipeData.recipe_id,
        user_id: favoriteRecipeData.user_id,
      };
      return favoriteRecipe;
    } else {
      return null;
    }
  }

  static async updateFavoriteRecipe(
    updatedFavoriteRecipe: FavoriteRecipeInterface,
    favoriteRecipeId: number
  ): Promise<FavoriteRecipe | null> {
    if (!FavoriteRecipe.connection) {
      FavoriteRecipe.connection = await Database.getDbInstance();
      if (!FavoriteRecipe.connection) {
        throw new Error("connection not initialised");
      }
    }
    const query =
      "UPDATE recipes_users SET recipe_id = ?, user_id = ? WHERE id = ?";
    const [result] = await FavoriteRecipe.connection.execute<ResultSetHeader>(
      query,
      [
        updatedFavoriteRecipe.recipe_id,
        updatedFavoriteRecipe.user_id,
        favoriteRecipeId,
      ]
    );

    return result;
  }

  static async deleteFavoriteRecipe(
    favoriteRecipeId: number
  ): Promise<FavoriteRecipe | null> {
    if (!FavoriteRecipe.connection) {
      FavoriteRecipe.connection = await Database.getDbInstance();
      if (!FavoriteRecipe.connection) {
        throw new Error("connection not initialised");
      }
    }

    const query = "DELETE FROM recipes_users WHERE id = ?";
    const result = await FavoriteRecipe.connection.execute(query, [
      favoriteRecipeId,
    ]);
    return result;
  }
}

export default FavoriteRecipe;
