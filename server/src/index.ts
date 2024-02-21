import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter";
import recipeRouter from "./routes/recipeRouter";
import ingredientRouter from "./routes/ingredientRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/ingredient", ingredientRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
