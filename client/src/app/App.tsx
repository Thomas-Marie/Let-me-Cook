import "./App.css";
import IngredientList from "../components/lists/IngredientList";
import SearchBar from "../components/SeachBar";
import { useEffect, useState } from "react";
import { Ingredient } from "../types/ingredient";
import axios from "axios";

function App() {
  const [search, setSearch] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get<Ingredient[]>(
          "http://localhost:3000/ingredient/"
        );
        setIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchIngredients();
  }, []);

  const visibleIngredients = ingredients.filter((ingredient) => {
    if (search && !ingredient.name.includes(search)) {
      return false;
    }
    return true;
  });
  return (
    <div>
      <SearchBar search={search} onSearchChange={setSearch} />
      <IngredientList ingredients={visibleIngredients} />
    </div>
  );
}

export default App;
