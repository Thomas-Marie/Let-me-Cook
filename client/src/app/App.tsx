import "./App.css";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Ingredient } from "../types/ingredient";
import IngredientList from "../components/lists/IngredientList";
import SearchBar from "../components/SeachBar";
import SelectedIngredients from "../components/SelectedIngredients";
import RecipeFetcher from "../components/RecipeFetcher";

function App() {
  const [search, setSearch] = useState<string>("");
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );

  const handleIngredientSelection = (ingredient: Ingredient) => {
    setSelectedIngredients((prevIngredients) => [
      ...prevIngredients,
      ingredient,
    ]);
  };

  const handleIngredientRemove = (ingredient: Ingredient) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredient)
    );
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <SearchBar search={search} onSearchChange={setSearch} />
          <IngredientList
            search={search}
            selectedIngredients={selectedIngredients}
            onIngredientSelection={handleIngredientSelection}
          />
        </Col>
        <Col md={6}>
          <SelectedIngredients
            ingredients={selectedIngredients}
            onIngredientRemove={handleIngredientRemove}
          />
          <RecipeFetcher
            selectedIngredients={selectedIngredients.map(
              (ingredient) => ingredient.id
            )}
            onIngredientRemove={handleIngredientRemove}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
