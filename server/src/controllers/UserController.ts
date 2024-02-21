import { Request, Response } from "express";
import UserModel, { UserInterface } from "../models/User";

class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    const newUser: UserInterface = req.body;
    try {
      const result = await UserModel.createUser(newUser);
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("User creation error:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getUsers(res: Response): Promise<void> {
    try {
      const result = await UserModel.getUsers();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error when retrieving users:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await UserModel.getUserById(userId);

      if (!user) {
        res.status(404).json({ error: "User not found1" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error when retrieving user:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      const updatedUser = req.body;

      if (!updatedUser) {
        res.status(400).json({ error: "Invalid request body" });
        return;
      }

      const result = await UserModel.updateUser(updatedUser, userId);

      if (!result) {
        res.status(404).json({ error: "User not found2" });
        return;
      }

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error when updating a user:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await UserModel.deleteUser(userId);

      if (!user) {
        res.status(404).json({ error: "User not found3" });
        return;
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error when deleting a user:", error);
      res.status(500).json({ error: "Error server" });
    }
  }
}

export default new UserController();
