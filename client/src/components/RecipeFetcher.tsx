import { useState, useEffect } from "react";
import axios from "axios";
import { Recipe } from "../types/recipe";
import { Ingredient } from "../types/ingredient";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

type RecipeFetcherProps = {
  selectedIngredients: number[];
  onIngredientRemove: (ingredient: Ingredient) => void;
};

export default function RecipeFetcher({
  selectedIngredients,
}: RecipeFetcherProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    console.log(selectedIngredients);
    try {
      const ingredientIds = selectedIngredients.join("&ingredientIds=");
      const endpoint = `http://localhost:3000/recipe/by-ingredients?ingredientIds=${ingredientIds}`;
      const response = await axios.get<Recipe[]>(endpoint);
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [selectedIngredients]);

  return (
    <div>
      <Row xs={1} md={2} className="g-4">
        {recipes.map((recipe: Recipe, idx: number) => (
          <Col key={idx}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={recipe.picture} />
              <Card.Body>
                <Button variant="primary">{recipe.title}</Button>
                <Card.Text>{recipe.instructions}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
