import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../../types/recipe";

const recipeApi = axios.create({
    baseURL: "http://localhost:3000/recipe/"
})

export const getRecipes = async () => {
    const response = await recipeApi.get("/");  
    return response.data;
  }

  export default function RecipeList() {
    const [recipes, setRecipes] = useState<any>([])

    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            const data = await getRecipes();
            setRecipes(data);
          } catch (error) {
            console.error("Error fetching Recipes:", error);
          }
        }
        fetchRecipes();
      }, [])

      return (
        <div>
            {recipes.map((recipe: Recipe) => (
          <div key={recipe.id}>{recipe.title}</div>
        ))}
        </div>
      )
}