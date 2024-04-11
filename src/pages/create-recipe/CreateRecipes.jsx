import React, { useState } from "react";
import RecipeCreationForm from "./components/RecipeCreationForm";
import CheeserSearchComponent from "./components/CheeserSearchComponent";
import "./create-recipe.css";

const CreateRecipes = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredient(ingredient);
    // You can do something with the selected ingredient here
  };

  return (
    <div id="recipe-creation-page">
      <RecipeCreationForm
        selectedIngredient={selectedIngredient}
        handleIngredientSelect={handleIngredientSelect}
      />
      <CheeserSearchComponent onIngredientSelect={handleIngredientSelect} />
    </div>
  );
};

export default CreateRecipes;
