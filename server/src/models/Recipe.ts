import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Database from "./Database";

export interface RecipeInterface {
  id: number;
  title: string;
  instructions: string;
}

class Recipe extends Database {
  static connection: Connection;

  static async createRecipe(
    newRecipe: RecipeInterface
  ): Promise<ResultSetHeader> {
    if (!Recipe.connection) {
      Recipe.connection = await Database.getDbInstance();
      if (!Recipe.connection) {
        throw new Error("connection not initialised");
      }
    }

    const query = `INSERT INTO recipes (title, instructions) VALUES (?, ?)`;
    const [result] = await Recipe.connection.execute<ResultSetHeader>(query, [
      newRecipe.title,
      newRecipe.instructions,
    ]);

    return result;
  }

  static async getRecipes(): Promise<Recipe[]> {
    if (!Recipe.connection) {
      Recipe.connection = await Database.getDbInstance();
      if (!Recipe.connection) {
        throw new Error("connection not initialised");
      }
    }
    const query = "SELECT * FROM recipes";
    const [rows] = await this.connection.execute<RowDataPacket[]>(query);

    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id,
          title: row.title,
          instructions: row.instructions,
        }))
      : [];
  }

  static async getRecipeById(recipeId: number): Promise<Recipe | null> {
    if (!Recipe.connection) {
      Recipe.connection = await Database.getDbInstance();
      if (!Recipe.connection) {
        throw new Error("connection not initialised");
      }
    }
    const query = "SELECT * FROM recipes WHERE id = ?";
    const [rows] = await this.connection.execute(query, [recipeId]);
    if (Array.isArray(rows) && rows.length > 0) {
      const recipeData = rows[0] as RowDataPacket;
      const recipe: Recipe = {
        id: recipeData.id,
        title: recipeData.title,
        instructions: recipeData.instructions,
      };
      return recipe;
    } else {
      return null;
    }
  }

  static async updateRecipe(
    updatedRecipe: RecipeInterface,
    recipeId: number
  ): Promise<Recipe | null> {
    if (!Recipe.connection) {
      Recipe.connection = await Database.getDbInstance();
      if (!Recipe.connection) {
        throw new Error("connection not initialised");
      }
    }
    const query = "UPDATE recipes SET title = ?, instructions = ? WHERE id = ?";
    const [result] = await Recipe.connection.execute<ResultSetHeader>(query, [
      updatedRecipe.title,
      updatedRecipe.instructions,
      recipeId,
    ]);

    return result;
  }

  static async deleteRecipe(recipeId: number): Promise<Recipe | null> {
    if (!Recipe.connection) {
      Recipe.connection = await Database.getDbInstance();
      if (!Recipe.connection) {
        throw new Error("connection not initialised");
      }
    }

    const query = "DELETE FROM recipes WHERE id = ?";
    const result = await Recipe.connection.execute(query, [recipeId]);
    return result;
  }
}

export default Recipe;
