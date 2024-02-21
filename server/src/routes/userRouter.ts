import UserController from "../controllers/UserController";
import express, { Router, Request, Response } from "express";

const userRouter = express.Router();

userRouter.post("/", (req, res) => UserController.createUser(req, res));
userRouter.get("/", (req, res) => UserController.getUsers(res));
userRouter.get("/:id", (req, res) => UserController.getUserById(req, res));
userRouter.put("/:id", (req, res) => UserController.updateUser(req, res));
userRouter.delete("/:id", (req, res) => UserController.deleteUser(req, res));

export default userRouter;
