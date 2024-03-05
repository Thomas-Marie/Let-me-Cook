import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Database from "./Database";

export interface IngredientInterface {
  id: number;
  name: string;
  season: string;
}

class Ingredient extends Database {
  static connection: Connection;

  static async createIngredient(
    newIngredient: IngredientInterface
  ): Promise<ResultSetHeader> {
    await Database.checkDatabaseConnection();
    const query = `INSERT INTO ingredients (name, season) VALUES (?, ?)`;
    const [result] = await Ingredient.connection.execute<ResultSetHeader>(
      query,
      [newIngredient.name, newIngredient.season]
    );

    return result;
  }

  static async getIngredients(): Promise<Ingredient[]> {
    await Database.checkDatabaseConnection();
    const query = "SELECT * FROM ingredients";
    const [rows] = await this.connection.execute<RowDataPacket[]>(query);

    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id,
          name: row.name,
          season: row.season,
        }))
      : [];
  }

  static async getIngredientById(
    ingredientId: number
  ): Promise<Ingredient | null> {
    await Database.checkDatabaseConnection();
    const query = "SELECT * FROM ingredients WHERE id = ?";
    const [rows] = await this.connection.execute(query, [ingredientId]);
    if (Array.isArray(rows) && rows.length > 0) {
      const ingredientData = rows[0] as RowDataPacket;
      const ingredient: Ingredient = {
        id: ingredientData.id,
        name: ingredientData.name,
        season: ingredientData.season,
      };

      return ingredient;
    } else {
      return null;
    }
  }

  static async updateIngredient(
    updatedIngredient: IngredientInterface,
    ingredientId: number
  ): Promise<Ingredient | null> {
    await Database.checkDatabaseConnection();
    const query = "UPDATE ingredients SET name = ?, season = ? WHERE id = ?";
    const [result] = await Ingredient.connection.execute<ResultSetHeader>(
      query,
      [updatedIngredient.name, updatedIngredient.season, ingredientId]
    );

    return result;
  }

  static async deleteIngredient(
    ingredientId: number
  ): Promise<Ingredient | null> {
    await Database.checkDatabaseConnection();
    const query = "DELETE FROM ingredients WHERE id = ?";
    const result = await Ingredient.connection.execute(query, [ingredientId]);

    return result;
  }
}

export default Ingredient;
