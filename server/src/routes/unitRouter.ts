import UnitController from "../controllers/UnitController";
import express, { Router, Request, Response } from "express";

const unitRouter = express.Router();

unitRouter.post("/", (req, res) => UnitController.createUnit(req, res));
unitRouter.get("/", (req, res) => UnitController.getUnits(res));
unitRouter.get("/:id", (req, res) => UnitController.getUnitById(req, res));
unitRouter.put("/:id", (req, res) => UnitController.updateUnit(req, res));
unitRouter.delete("/:id", (req, res) => UnitController.deleteUnit(req, res));

export default unitRouter;
