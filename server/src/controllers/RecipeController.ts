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

  async getRecipeById(req: Request, res: Response): Promise<void> {
    try {
      const recipeId = parseInt(req.params.id, 10);
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
      const recipeId = parseInt(req.params.id, 10);
      const updatedRecipe = req.body;

      if (!updatedRecipe) {
        res.status(400).json({ error: "Invalid request body" });
        return;
      }
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
      const recipeId = parseInt(req.params.id, 10);
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
