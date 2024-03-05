import { Request, Response } from "express";
import UnitModel, { UnitInterface } from "../models/Unit";

class UnitController {
  async createUnit(req: Request, res: Response): Promise<void> {
    const newUnit: UnitInterface = req.body;
    try {
      const result = await UnitModel.createUnit(newUnit);
      res.status(201).json({ message: "Unit created successfully" });
    } catch (error) {
      console.error("Unit creation error:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getUnits(res: Response): Promise<void> {
    try {
      const result = await UnitModel.getUnits();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error when retrieving units:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getUnitById(req: Request, res: Response): Promise<void> {
    try {
      const unitId = parseInt(req.params.id);
      const unit = await UnitModel.getUnitById(unitId);

      if (!unit) {
        res.status(404).json({ error: "unit not found" });
        return;
      }

      res.status(200).json(unit);
    } catch (error) {
      console.error("Error when retrieving unit:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async updateUnit(req: Request, res: Response): Promise<void> {
    try {
      const unitId = parseInt(req.params.id);
      const currentUnit = await UnitModel.getUnitById(unitId);
      if (!currentUnit) {
        res.status(404).json({ error: "Current unit not found" });
      }
      const updatedUnit = {
        ...currentUnit,
        ...req.body,
      };

      const result = await UnitModel.updateUnit(updatedUnit, unitId);

      if (!result) {
        res.status(404).json({ error: "Unit not found" });
        return;
      }

      res.status(200).json({ message: "Unit updated successfully" });
    } catch (error) {
      console.error("Error when updating a unit:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async deleteUnit(req: Request, res: Response): Promise<void> {
    try {
      const unitId = parseInt(req.params.id);
      const unit = await UnitModel.deleteUnit(unitId);

      if (!unit) {
        res.status(404).json({ error: "Unit not found" });
        return;
      }

      res.status(200).json({ message: "Unit deleted successfully" });
    } catch (error) {
      console.error("Error when deleting a unit:", error);
      res.status(500).json({ error: "Error server" });
    }
  }
}

export default new UnitController();
