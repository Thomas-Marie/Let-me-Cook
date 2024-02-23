import IngredientController from "../controllers/IngredientController";
import express from "express";

const ingredientRouter = express.Router();

ingredientRouter.post("/", (req, res) =>
  IngredientController.createIngredient(req, res)
);
ingredientRouter.get("/", (req, res) =>
  IngredientController.getIngredients(res)
);
ingredientRouter.get("/:id", (req, res) =>
  IngredientController.getIngredientsById(req, res)
);
ingredientRouter.put("/:id", (req, res) =>
  IngredientController.updateIngredient(req, res)
);
ingredientRouter.delete("/:id", (req, res) =>
  IngredientController.deleteIngredient(req, res)
);

export default ingredientRouter;
