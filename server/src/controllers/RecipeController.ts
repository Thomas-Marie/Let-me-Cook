import { Request, Response } from "express";
import RecipeModel, { RecipeInterface } from "../models/Recipe";

class RecipeController {
  async createRecipe(req: Request, res: Response): Promise<void> {
    const newRecipe: RecipeInterface = req.body;
    try {
      const result = await RecipeModel.createRecipe(newRecipe);
      res.status(201).json({ message: "Recipe created successfully" });
    } catch (error) {
      console.error("Recipe creation error:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getRecipes(res: Response): Promise<void> {
    try {
      const result = await RecipeModel.getRecipes();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error when retrieving recipes:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getIngredientIdsByRecipeId(req: Request, res: Response): Promise<void> {
    try {
      const recipeId: number = parseInt(req.params.recipeId);
      if (isNaN(recipeId)) {
        res.status(400).json({ error: "Invalid recipe ID provided" });
        return;
      }
      const ingredientIds = await RecipeModel.getIngredientIdsByRecipeId(
        recipeId
      );
      res.status(200).json(ingredientIds);
    } catch (error) {
      console.error("Error retrieving ingredient IDs by recipe ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getRecipesByIngredients(req: Request, res: Response): Promise<void> {
    try {
      if (!req.query.ingredientIds) {
        res.status(400).json({ error: "No ingredient IDs provided" });
        return;
      }
      const ingredientIds: number[] = Array.isArray(req.query.ingredientIds)
        ? (req.query.ingredientIds as string[]).map((id) => parseInt(id))
        : [parseInt(req.query.ingredientIds as string)];

      const recipes = await RecipeModel.getRecipesByIngredients(ingredientIds);
      res.status(200).json(recipes);
    } catch (error) {
      console.error("Error when retrieving recipes by ingredients:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getRecipeById(req: Request, res: Response): Promise<void> {
    try {
      const recipeId = parseInt(req.params.id);
      const recipe = await RecipeModel.getRecipeById(recipeId);
      if (!recipe) {
        res.status(404).json({ error: "Recipe not found" });
        return;
      }
      res.status(200).json(recipe);
    } catch (error) {
      console.error("Error when retrieving recipe:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async updateRecipe(req: Request, res: Response): Promise<void> {
    try {
      const recipeId = parseInt(req.params.id);
      const currentRecipe = await RecipeModel.getRecipeById(recipeId);
      if (!currentRecipe) {
        res.status(404).json({ error: "Current recipe not found" });
        return;
      }
      const updatedRecipe = {
        ...currentRecipe,
        ...req.body,
      };
      const result = await RecipeModel.updateRecipe(updatedRecipe, recipeId);
      if (!result) {
        res.status(404).json({ error: "Recipe not found" });
        return;
      }
      res.status(200).json({ message: "Recipe updated successfully" });
    } catch (error) {
      console.error("Error when updating a recipe:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async deleteRecipe(req: Request, res: Response): Promise<void> {
    try {
      const recipeId = parseInt(req.params.id);
      const recipe = await RecipeModel.deleteRecipe(recipeId);
      if (!recipe) {
        res.status(404).json({ error: "Recipe not found" });
        return;
      }
      res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
      console.error("Error when deleting a recipe:", error);
      res.status(500).json({ error: "Error server" });
    }
  }
}

export default new RecipeController();
