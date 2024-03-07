import FavoriteIngredientController from "../controllers/FavoriteIngredientController";
import express, { Router, Request, Response } from "express";

const favoriteIngredientRouter = express.Router();

favoriteIngredientRouter.post("/", (req, res) =>
  FavoriteIngredientController.createFavoriteIngredient(req, res)
);
favoriteIngredientRouter.get("/", (req, res) =>
  FavoriteIngredientController.getFavoriteIngredients(res)
);
favoriteIngredientRouter.get("/:id", (req, res) =>
  FavoriteIngredientController.getFavoriteIngredientById(req, res)
);
favoriteIngredientRouter.put("/:id", (req, res) =>
  FavoriteIngredientController.updateFavoriteIngredient(req, res)
);
favoriteIngredientRouter.delete("/:id", (req, res) =>
  FavoriteIngredientController.deleteFavoriteIngredient(req, res)
);

export default favoriteIngredientRouter;
