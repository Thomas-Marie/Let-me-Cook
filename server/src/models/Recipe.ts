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
    await Database.checkDatabaseConnection();
    const query = `INSERT INTO recipes (title, instructions) VALUES (?, ?)`;
    const [result] = await Recipe.connection.execute<ResultSetHeader>(query, [
      newRecipe.title,
      newRecipe.instructions,
    ]);

    return result;
  }

  static async getRecipes(): Promise<RecipeInterface[]> {
    await Database.checkDatabaseConnection();
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

  static async getIngredientIdsByRecipeId(recipeId: number): Promise<number[]> {
    try {
      await Database.checkDatabaseConnection();

      const query = "SELECT ingredient_id FROM quantities WHERE recipe_id = ?";
      const [rows] = await this.connection.execute<RowDataPacket[]>(query, [
        recipeId,
      ]);
      const ingredientIds: number[] = rows.map((row) => row.ingredient_id);

      return ingredientIds;
    } catch (error) {
      throw new Error("Error retrieving ingredient IDs by recipe ID: " + error);
    }
  }

  /*
  une recette est retournée SEULEMENT SI tous les ingrédients associés à la recette sont sélectionnés 
  sinon ça retourne un array vide
  */
  static async getRecipesByIngredients(
    ingredientIds: number[]
  ): Promise<RecipeInterface[]> {
    try {
      await Database.checkDatabaseConnection();
      const allRecipes: RecipeInterface[] = await Recipe.getRecipes();
      const validRecipes: RecipeInterface[] = [];

      for (const recipe of allRecipes) {
        const associatedIngredients = await Recipe.getIngredientIdsByRecipeId(
          recipe.id
        );
        const allSelectedIngredientsIncluded = ingredientIds.every(
          (selectedIngredientId) =>
            associatedIngredients.includes(selectedIngredientId)
        );
        const allAssociatedIngredientsIncluded = associatedIngredients.every(
          (associatedIngredientId) =>
            ingredientIds.includes(associatedIngredientId)
        );

        if (
          allSelectedIngredientsIncluded &&
          allAssociatedIngredientsIncluded
        ) {
          validRecipes.push(recipe);
        }
      }

      return validRecipes;
    } catch (error) {
      throw new Error("Error retrieving recipes by ingredients: " + error);
    }
  }

  static async getRecipeById(recipeId: number): Promise<Recipe | null> {
    await Database.checkDatabaseConnection();
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
    await Database.checkDatabaseConnection();
    const query = "UPDATE recipes SET title = ?, instructions = ? WHERE id = ?";
    const [result] = await Recipe.connection.execute<ResultSetHeader>(query, [
      updatedRecipe.title,
      updatedRecipe.instructions,
      recipeId,
    ]);

    return result;
  }

  static async deleteRecipe(recipeId: number): Promise<Recipe | null> {
    await Database.checkDatabaseConnection();
    const query = "DELETE FROM recipes WHERE id = ?";
    const result = await Recipe.connection.execute(query, [recipeId]);

    return result;
  }
}

export default Recipe;
