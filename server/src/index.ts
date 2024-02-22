import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter";
import recipeRouter from "./routes/recipeRouter";
import ingredientRouter from "./routes/ingredientRouter";
import unitRouter from "./routes/unitRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/ingredient", ingredientRouter);
app.use("/unit", unitRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
