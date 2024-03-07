import express from "express";
import RecipeController from "../controllers/RecipeController";

const recipeRouter = express.Router();

recipeRouter.post("/", (req, res) => RecipeController.createRecipe(req, res));
recipeRouter.get("/", (req, res) => RecipeController.getRecipes(res));
recipeRouter.get(
  "/:recipeId/getIngredientIds",
  RecipeController.getIngredientIdsByRecipeId
);
recipeRouter.get("/by-ingredients", (req, res) =>
  RecipeController.getRecipesByIngredients(req, res)
);
recipeRouter.get("/:id", (req, res) =>
  RecipeController.getRecipeById(req, res)
);
recipeRouter.put("/:id", (req, res) => RecipeController.updateRecipe(req, res));
recipeRouter.delete("/:id", (req, res) =>
  RecipeController.deleteRecipe(req, res)
);

export default recipeRouter;
