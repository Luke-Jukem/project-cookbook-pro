import React from "react";
import SavedMeals from "../components/SavedMeals";
import RecipeCreationForm from "../components/RecipeCreationForm";

const CreateRecipe = () => {
  return (
    <div className="recipe-creation-page">
      <div className="saved-meals-container">
        <SavedMeals />
      </div>
      <RecipeCreationForm />
    </div>
  );
};

export default CreateRecipe;
