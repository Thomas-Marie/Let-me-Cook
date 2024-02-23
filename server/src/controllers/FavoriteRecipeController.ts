import { Request, Response } from "express";
import FavoriteRecipeModel, {
  FavoriteRecipeInterface,
} from "../models/FavoriteRecipe";

class FavoriteRecipeController {
  async createFavoriteRecipe(req: Request, res: Response): Promise<void> {
    const newFavoriteRecipe: FavoriteRecipeInterface = req.body;
    try {
      const result = await FavoriteRecipeModel.createFavoriteRecipe(
        newFavoriteRecipe
      );
      res.status(201).json({ message: "favorite recipe created successfully" });
    } catch (error) {
      console.error("favorite recipe creation error:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getFavoriteRecipes(res: Response): Promise<void> {
    try {
      const result = await FavoriteRecipeModel.getFavoriteRecipes();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error when retrieving favorite recipes:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getFavoriteRecipeById(req: Request, res: Response): Promise<void> {
    try {
      const favoriteRecipeId = parseInt(req.params.id, 10);
      const favoriteRecipe = await FavoriteRecipeModel.getFavoriteRecipeById(
        favoriteRecipeId
      );

      if (!favoriteRecipe) {
        res.status(404).json({ error: "favorite recipe not found" });
        return;
      }

      res.status(200).json(favoriteRecipe);
    } catch (error) {
      console.error("Error when retrieving favorite recipe:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async updateFavoriteRecipe(req: Request, res: Response): Promise<void> {
    try {
      const favoriteRecipeId = parseInt(req.params.id, 10);
      const updatedFavoriteRecipe = req.body;

      if (!updatedFavoriteRecipe) {
        res.status(400).json({ error: "Invalid request body" });
        return;
      }

      const result = await FavoriteRecipeModel.updateFavoriteRecipe(
        updatedFavoriteRecipe,
        favoriteRecipeId
      );

      if (!result) {
        res.status(404).json({ error: "favorite recipe not found" });
        return;
      }

      res.status(200).json({ message: "favorite recipe updated successfully" });
    } catch (error) {
      console.error("Error when updating a favorite recipe:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async deleteFavoriteRecipe(req: Request, res: Response): Promise<void> {
    try {
      const favoriteRecipeId = parseInt(req.params.id, 10);
      const favoriteRecipe = await FavoriteRecipeModel.deleteFavoriteRecipe(
        favoriteRecipeId
      );

      if (!favoriteRecipe) {
        res.status(404).json({ error: "Favorite recipe not found" });
        return;
      }

      res.status(200).json({ message: "Favorite recipe deleted successfully" });
    } catch (error) {
      console.error("Error when deleting a favorite recipe:", error);
      res.status(500).json({ error: "Error server" });
    }
  }
}

export default new FavoriteRecipeController();
