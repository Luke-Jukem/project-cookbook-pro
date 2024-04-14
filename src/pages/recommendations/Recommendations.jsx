import React, { useState } from "react";
import GPT from "./components/GPT";
import GptResponseRenderer from "./components/GptResponseRenderer";
import "./recommendations.css";

const Recommendations = () => {
  const [recipeType, setRecipeType] = useState("");
  const { response, responseHistory, error, loading, handleSubmit } = GPT();

  const isButtonActive = (type) => recipeType === type;

  const handleRecipeTypeClick = (type) => {
    setRecipeType(type);
  };

  const handleGenerateRecipe = () => {
    handleSubmit(recipeType);
  };

  return (
    <div id="recommendations-container">
      <div id="recipe-type-selection-container">
        <h1 id="recommendations-heading">
          Welcome to the Recommendations Page
        </h1>
        <button
          className={`recipe-type-button ${
            isButtonActive("Breakfast") ? "active" : ""
          }`}
          onClick={() => handleRecipeTypeClick("Breakfast")}
        >
          Breakfast
        </button>
        <button
          className={`recipe-type-button ${
            isButtonActive("Lunch") ? "active" : ""
          }`}
          onClick={() => handleRecipeTypeClick("Lunch")}
        >
          Lunch
        </button>
        <button
          className={`recipe-type-button ${
            isButtonActive("Dinner") ? "active" : ""
          }`}
          onClick={() => handleRecipeTypeClick("Dinner")}
        >
          Dinner
        </button>
        <button onClick={handleGenerateRecipe}>Generate Recipe</button>
      </div>
      <div id="center-content">
        {error && <div>Error: {error}</div>}
        <GptResponseRenderer
          response={response}
          loading={loading}
          responseHistory={responseHistory}
        />
      </div>
    </div>
  );
};

export default Recommendations;
