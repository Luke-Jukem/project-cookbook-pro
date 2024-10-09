import React, { useState } from "react";
import { Input, Button } from "reactstrap";
import MealDataManager from "../../../utils/MealDataManager";
import ".././create-recipe.css";
import IngredientSearchResult from "./IngredientSearchResult";

const IngredientSearchComponent = ({ onIngredientSelect, onClear }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const mealDataManager = new MealDataManager();

  const handleSearch = async () => {
    if (searchTerm.length >= 3) {
      try {
        const { results } = await mealDataManager.searchIngredients(searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching ingredients:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleIngredientClick = (ingredient) => {
    onIngredientSelect(ingredient);
  };

  return (
    <div id="ingredient-search" className="d-flex">
      <div id="ingredient-search-box" className="mr-3">
        <Input
          id="ingredient-input"
          type="text"
          placeholder="Search for ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          id="ingredient-search-button"
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <div id="ingredient-list">
        {searchResults.length === 0 && (
          <div id="create-recipe-instructions">
            <h3>
              Enter an ingredient in the search box and click the "Search"
              button to find matching ingredients. Click on an ingredient to add
              it to the recipe.
            </h3>
          </div>
        )}
        {searchResults.length > 0 && (
          <ul className="list-unstyled">
            {searchResults.map((ingredient) => (
              <IngredientSearchResult
                ingredientData={ingredient}
                key={ingredient.id}
                onClick={() => handleIngredientClick(ingredient)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IngredientSearchComponent;
