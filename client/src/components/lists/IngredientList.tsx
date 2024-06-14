import { useEffect, useState } from "react";
import axios from "axios";
import { Ingredient } from "../../types/ingredient";

type IngredientListProps = {
  search: string;
  selectedIngredients: Ingredient[];
  onIngredientSelection: (ingredient: Ingredient) => void;
};

export default function IngredientList({ search, selectedIngredients, onIngredientSelection }: IngredientListProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get<Ingredient[]>("http://localhost:3000/ingredient/");
        setIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  const handleIngredientSelection = (ingredient: Ingredient) => {
    if (!selectedIngredients.find((selected) => selected.id === ingredient.id)) {
      onIngredientSelection(ingredient);
    }
  };

  const filteredIngredients = ingredients.filter((ingredient) => ingredient.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {filteredIngredients.map((ingredient) => (
        <div
          className='d-flex justify-content-center'
          key={ingredient.id}
          onClick={() => handleIngredientSelection(ingredient)}
          style={{ cursor: "pointer" }}>
          {ingredient.name}
        </div>
      ))}
    </div>
  );
}
