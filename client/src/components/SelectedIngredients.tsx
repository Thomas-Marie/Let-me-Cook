import { FaTrash } from "react-icons/fa";
import { Ingredient } from "../types/ingredient";

type SelectedIngredientsProps = {
  ingredients: Ingredient[];
  onIngredientRemove: (ingredient: Ingredient) => void;
};

export default function SelectedIngredients({ ingredients, onIngredientRemove }: SelectedIngredientsProps) {
  const handleIngredientRemove = (ingredient: Ingredient) => {
    onIngredientRemove(ingredient);
  };

  return (
    <div>
      <h3>Ingrédients sélectionnés :</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          {ingredient.name}
          <FaTrash onClick={() => handleIngredientRemove(ingredient)} style={{ cursor: "pointer" }} />
        </div>
      ))}
    </div>
  );
}
