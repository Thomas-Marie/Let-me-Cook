import { Request, Response } from "express";
import UserModel, { UserInterface } from "../models/User";

class UserController {
  async getUserById(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id, 10);

    try {
      const user = await UserModel.getUsersById(userId);

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error when retrieving user:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
    } catch (error) {
      console.error("Error when retrieving users:", error);
      res.status(500).json({ error: "Error server" });
    }
  }

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
}

export default new UserController();
