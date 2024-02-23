import DoseController from "../controllers/DoseController";
import express, { Router, Request, Response } from "express";

const doseRouter = express.Router();

doseRouter.post("/", (req, res) => DoseController.createDose(req, res));
doseRouter.get("/", (req, res) => DoseController.getDoses(res));
doseRouter.get("/:id", (req, res) => DoseController.getDoseById(req, res));
doseRouter.put("/:id", (req, res) => DoseController.updateDose(req, res));
doseRouter.delete("/:id", (req, res) => DoseController.deleteDose(req, res));

export default doseRouter;
