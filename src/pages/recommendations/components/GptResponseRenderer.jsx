import React from "react";
import GeneratedRecipeItem from "./GeneratedRecipeItem";

const GptResponseRenderer = ({ response, loading }) => {
  return (
    <div id="gpt-response-container">
      <div id="response-container-label">
        Here are some recipes based on your Saved Recipes preferences:
      </div>
      <div id="response-container">
        {loading && (
          <pre className="pre-style">
            Generating your Recipe Powered by ChatGPT...
          </pre>
        )}
        {Array.isArray(response?.recipes) &&
          response.recipes.map((recipe, index) => (
            <GeneratedRecipeItem key={index} recipe={recipe} />
          ))}
      </div>
    </div>
  );
};

export default GptResponseRenderer;
