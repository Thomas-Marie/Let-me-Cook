import express, { Router, Request, Response } from "express";
import QuantityController from "../controllers/QuantityController";

const quantityRouter = express.Router();

quantityRouter.post("/", (req, res) =>
  QuantityController.createQuantity(req, res)
);
quantityRouter.get("/", (req, res) => QuantityController.getQuantities(res));
quantityRouter.get(
  "/recipe/:recipeId",
  QuantityController.getQuantitiesByRecipeId
);
quantityRouter.get("/:id", (req, res) =>
  QuantityController.getQuantityById(req, res)
);
quantityRouter.put("/:id", (req, res) =>
  QuantityController.updateQuantity(req, res)
);
quantityRouter.delete("/:id", (req, res) =>
  QuantityController.deleteQuantity(req, res)
);
export default quantityRouter;
