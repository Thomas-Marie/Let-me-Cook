import { Request, Response } from "express";
import IngredientModel, { IngredientInterface } from "../models/Ingredient";

class IngredientController {
  async createIngredient(req: Request, res: Response): Promise<void> {
    const newIngredient: IngredientInterface = req.body;
    try {
      const result = await IngredientModel.createIngredient(newIngredient);
      res.status(201).json({ message: "Ingredient created sucessfully" });
    } catch (error) {
      console.error("Ingredient creation error:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getIngredients(res: Response): Promise<void> {
    try {
      const result = await IngredientModel.getIngredients();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error when retrieving ingredients:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getIngredientsById(req: Request, res: Response): Promise<void> {
    try {
      const ingredientId = parseInt(req.params.id);
      const ingredient = await IngredientModel.getIngredientById(ingredientId);

      if (!ingredient) {
        res.status(404).json({ error: "Ingredient not found" });
        return;
      }
      res.status(200).json(ingredient);
    } catch (error) {
      console.error("Error when retrieving ingredient:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async updateIngredient(req: Request, res: Response): Promise<void> {
    try {
      const ingredientId = parseInt(req.params.id);
      const currentIngredient = await IngredientModel.getIngredientById(
        ingredientId
      );
      if (!currentIngredient) {
        res.status(404).json({ error: "Current ingredient not found" });
      }
      const updatedIngredient = {
        ...currentIngredient,
        ...req.body,
      };

      const result = await IngredientModel.updateIngredient(
        updatedIngredient,
        ingredientId
      );

      if (!result) {
        res.status(404).json({ error: "Ingredient not found" });
        return;
      }

      res.status(200).json({ message: "Ingredient updated successfully" });
    } catch (error) {
      console.error("Error when updating an ingredient:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async deleteIngredient(req: Request, res: Response): Promise<void> {
    try {
      const ingredientId = parseInt(req.params.id);
      const ingredient = await IngredientModel.deleteIngredient(ingredientId);

      if (!ingredient) {
        res.status(404).json({ error: "Ingredient not found" });
        return;
      }

      res.status(200).json({ message: "Ingredient deleted successfully" });
    } catch (error) {
      console.error("Error when deleting an ingredient:", error);
      res.status(500).json({ error: "Error server" });
    }
  }
}

export default new IngredientController();
