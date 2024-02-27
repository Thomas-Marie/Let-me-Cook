import { Request, Response } from "express";
import QuantityModel, { QuantityInterface } from "../models/Quantity";

class QuantityController {
  async createQuantity(req: Request, res: Response): Promise<void> {
    const newQuantity: QuantityInterface = req.body;
    try {
      const result = await QuantityModel.createQuantity(newQuantity);
      res.status(201).json({ message: "Quantity created successfully" });
    } catch (error) {
      console.error("Quantity creation error:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getQuantities(res: Response): Promise<void> {
    try {
      const result = await QuantityModel.getQuantities();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error when retrieving quantities:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getQuantityById(req: Request, res: Response): Promise<void> {
    try {
      const quantityId = parseInt(req.params.id);
      const quantity = await QuantityModel.getQuantityById(quantityId);

      if (!quantity) {
        res.status(404).json({ error: "Quantity not found" });
        return;
      }

      res.status(200).json(quantity);
    } catch (error) {
      console.error("Error when retrieving quantity:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async updateQuantity(req: Request, res: Response): Promise<void> {
    try {
      const quantityId = parseInt(req.params.id);
      const currentQuantity = await QuantityModel.getQuantityById(quantityId);
      if (!currentQuantity) {
        res.status(404).json({ error: "Current quantity not found" });
      }
      const updatedQuantity = {
        ...currentQuantity,
        ...req.body,
      };

      const result = await QuantityModel.updateQuantity(
        updatedQuantity,
        quantityId
      );

      if (!result) {
        res.status(404).json({ error: "Quantity not found" });
        return;
      }

      res.status(200).json({ message: "Quantity updated successfully" });
    } catch (error) {
      console.error("Error when updating a Quantity:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async deleteQuantity(req: Request, res: Response): Promise<void> {
    try {
      const quantityId = parseInt(req.params.id);
      const quantity = await QuantityModel.deleteQuantity(quantityId);

      if (!quantity) {
        res.status(404).json({ error: "Quantity not found" });
        return;
      }

      res.status(200).json({ message: "Quantity deleted successfully" });
    } catch (error) {
      console.error("Error when deleting a quantity:", error);
      res.status(500).json({ error: "Error server" });
    }
  }
}

export default new QuantityController();
