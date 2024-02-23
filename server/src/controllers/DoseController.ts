import { Request, Response } from "express";
import DoseModel, { DoseInterface } from "../models/Dose";

class DoseController {
  async createDose(req: Request, res: Response): Promise<void> {
    const newDose: DoseInterface = req.body;
    try {
      const result = await DoseModel.createDose(newDose);
      res.status(201).json({ message: "Dose created successfully" });
    } catch (error) {
      console.error("Dose creation error:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getDoses(res: Response): Promise<void> {
    try {
      const result = await DoseModel.getDoses();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error when retrieving doses:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getDoseById(req: Request, res: Response): Promise<void> {
    try {
      const doseId = parseInt(req.params.id, 10);
      const dose = await DoseModel.getDoseById(doseId);

      if (!dose) {
        res.status(404).json({ error: "Dose not found" });
        return;
      }

      res.status(200).json(dose);
    } catch (error) {
      console.error("Error when retrieving dose:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async updateDose(req: Request, res: Response): Promise<void> {
    try {
      const doseId = parseInt(req.params.id, 10);
      const updatedDose = req.body;

      if (!updatedDose) {
        res.status(400).json({ error: "Invalid request body" });
        return;
      }

      const result = await DoseModel.updateDose(updatedDose, doseId);

      if (!result) {
        res.status(404).json({ error: "Dose not found" });
        return;
      }

      res.status(200).json({ message: "Dose updated successfully" });
    } catch (error) {
      console.error("Error when updating a dose:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async deleteDose(req: Request, res: Response): Promise<void> {
    try {
      const doseId = parseInt(req.params.id, 10);
      const dose = await DoseModel.deleteDose(doseId);

      if (!dose) {
        res.status(404).json({ error: "Dose not found" });
        return;
      }

      res.status(200).json({ message: "Dose deleted successfully" });
    } catch (error) {
      console.error("Error when deleting a dose:", error);
      res.status(500).json({ error: "Error server" });
    }
  }
}

export default new DoseController();
