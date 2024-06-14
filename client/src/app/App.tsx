import "./App.css";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Ingredient } from "../types/ingredient";
import IngredientList from "../components/lists/IngredientList";
import SearchBar from "../components/SeachBar";
import SelectedIngredients from "../components/SelectedIngredients";
import RecipeFetcher from "../components/RecipeFetcher";
import NavBar from "../components/Navbar";

function App() {
  const [search, setSearch] = useState<string>("");
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

  const handleIngredientSelection = (ingredient: Ingredient) => {
    setSelectedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const handleIngredientRemove = (ingredient: Ingredient) => {
    setSelectedIngredients((prevIngredients) => prevIngredients.filter((item) => item !== ingredient));
  };

  return (
    <div>
      <NavBar />
      <Row>
        <Col md={4}>
          <SearchBar search={search} onSearchChange={setSearch} />
          <IngredientList search={search} selectedIngredients={selectedIngredients} onIngredientSelection={handleIngredientSelection} />
        </Col>
        <Col md={4}>
          <SelectedIngredients ingredients={selectedIngredients} onIngredientRemove={handleIngredientRemove} />
          <RecipeFetcher selectedIngredients={selectedIngredients.map((ingredient) => ingredient.id)} onIngredientRemove={handleIngredientRemove} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
