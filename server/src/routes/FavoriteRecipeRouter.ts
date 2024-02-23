import FavoriteRecipeController from "../controllers/FavoriteRecipeController";
import express, { Router, Request, Response } from "express";

const favoriteRecipeRouter = express.Router();

favoriteRecipeRouter.post("/", (req, res) =>
  FavoriteRecipeController.createFavoriteRecipe(req, res)
);
favoriteRecipeRouter.get("/", (req, res) =>
  FavoriteRecipeController.getFavoriteRecipes(res)
);
favoriteRecipeRouter.get("/:id", (req, res) =>
  FavoriteRecipeController.getFavoriteRecipeById(req, res)
);
favoriteRecipeRouter.put("/:id", (req, res) =>
  FavoriteRecipeController.updateFavoriteRecipe(req, res)
);
favoriteRecipeRouter.delete("/:id", (req, res) =>
  FavoriteRecipeController.deleteFavoriteRecipe(req, res)
);

export default favoriteRecipeRouter;
