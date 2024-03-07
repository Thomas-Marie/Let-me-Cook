import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter";
import recipeRouter from "./routes/recipeRouter";
import ingredientRouter from "./routes/ingredientRouter";
import unitRouter from "./routes/unitRouter";
import quantityRouter from "./routes/quantityRouter";
import doseRouter from "./routes/doseRouter";
import favoriteRecipeRouter from "./routes/favoriteRecipeRouter";
import favoriteIngredientRouter from "./routes/favoriteIngredientRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/ingredient", ingredientRouter);
app.use("/unit", unitRouter);
app.use("/quantity", quantityRouter);
app.use("/dose", doseRouter);
app.use("/favoriteRecipe", favoriteRecipeRouter);
app.use("/favoriteIngredient", favoriteIngredientRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
