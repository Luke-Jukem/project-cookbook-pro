import React from "react";
import RecipeCreationForm from "./components/RecipeCreationForm";
import IngredientSearch from "./components/IngredientSearch";

const CreateRecipes = () => {
  return (
    <div id="recipe-creation-page">
      <RecipeCreationForm />
      <IngredientSearch />
    </div>
  );
};
export default CreateRecipes;
