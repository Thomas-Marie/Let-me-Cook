import UserController from "../controllers/UserController";
import express, { Router, Request, Response } from "express";

const userRouter = express.Router();

userRouter.get("/:id", (req, res) => UserController.getUserById(req, res));
userRouter.get("/", (req, res) => UserController.getUsers(req, res));
userRouter.post("/", (req, res) => UserController.createUser(req, res));

export default userRouter;
