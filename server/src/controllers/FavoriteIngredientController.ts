import { Request, Response } from "express";
import FavoriteIngredientModel, {
  FavoriteIngredientInterface,
} from "../models/FavoriteIngredient";

class FavoriteIngredientController {
  async createFavoriteIngredient(req: Request, res: Response): Promise<void> {
    const newFavoriteIngredient: FavoriteIngredientInterface = req.body;
    try {
      const result = await FavoriteIngredientModel.createFavoriteIngredient(
        newFavoriteIngredient
      );
      res
        .status(201)
        .json({ message: "favorite ingredient created successfully" });
    } catch (error) {
      console.error("favorite ingredient creation error:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getFavoriteIngredients(res: Response): Promise<void> {
    try {
      const result = await FavoriteIngredientModel.getFavoriteIngredients();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error when retrieving favorite ingredients:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getFavoriteIngredientById(req: Request, res: Response): Promise<void> {
    try {
      const favoriteIngredientId = parseInt(req.params.id, 10);
      const favoriteIngredient =
        await FavoriteIngredientModel.getFavoriteIngredientById(
          favoriteIngredientId
        );

      if (!favoriteIngredient) {
        res.status(404).json({ error: "favorite ingredient not found" });
        return;
      }

      res.status(200).json(favoriteIngredient);
    } catch (error) {
      console.error("Error when retrieving favorite ingredient:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async updateFavoriteIngredient(req: Request, res: Response): Promise<void> {
    try {
      const favoriteIngredientId = parseInt(req.params.id, 10);
      const updatedFavoriteIngredient = req.body;

      if (!updatedFavoriteIngredient) {
        res.status(400).json({ error: "Invalid request body" });
        return;
      }

      const result = await FavoriteIngredientModel.updateFavoriteIngredient(
        updatedFavoriteIngredient,
        favoriteIngredientId
      );

      if (!result) {
        res.status(404).json({ error: "favorite ingredient not found" });
        return;
      }

      res
        .status(200)
        .json({ message: "favorite ingredient updated successfully" });
    } catch (error) {
      console.error("Error when updating a favorite Ingredient:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async deleteFavoriteIngredient(req: Request, res: Response): Promise<void> {
    try {
      const favoriteIngredientId = parseInt(req.params.id, 10);
      const favoriteIngredient =
        await FavoriteIngredientModel.deleteFavoriteIngredient(
          favoriteIngredientId
        );

      if (!favoriteIngredient) {
        res.status(404).json({ error: "Favorite ingredient not found" });
        return;
      }

      res
        .status(200)
        .json({ message: "Favorite ingredient deleted successfully" });
    } catch (error) {
      console.error("Error when deleting a favorite ingredient:", error);
      res.status(500).json({ error: "Error server" });
    }
  }
}

export default new FavoriteIngredientController();
