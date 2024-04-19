import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../../types/recipe";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

const recipeApi = axios.create({
  baseURL: "http://localhost:3000/recipe/",
});

export const getRecipes = async () => {
  const response = await recipeApi.get("/");
  return response.data;
};

export default function RecipeList() {
  const [recipes, setRecipes] = useState<any>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching Recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <Row xs={1} md={2} className="g-4">
      {recipes.map((recipe: Recipe, idx: number) => (
        <Col key={idx}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={recipe.picture} />
            <Card.Body>
              <Card.Title>{recipe.title}</Card.Title>
              <Card.Text>{recipe.instructions}</Card.Text>
              <Button variant="primary">Afficher le détail</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
