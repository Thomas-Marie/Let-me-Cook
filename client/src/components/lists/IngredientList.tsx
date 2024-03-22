import axios from "axios";
import { useEffect, useState } from "react";
import { Ingredient } from "../../types/ingredient";

const ingredientApi = axios.create({
  baseURL: "http://localhost:3000/ingredient/",
});

export const getIngredients = async () => {
  const response = await ingredientApi.get("/");
  return response.data;
};

type IngredientListProps = {
  ingredients: Ingredient[];
};

export default function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <div>
      {ingredients.map((ingredient: Ingredient) => (
        <div key={ingredient.id}>
          {ingredient.name}
          {ingredient.season === "été" ? "☘️" : undefined}
        </div>
      ))}
    </div>
  );
}
