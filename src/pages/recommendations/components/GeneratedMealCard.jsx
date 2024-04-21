import React, { useState } from "react";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import RecipeDetails from "../../../components/RecipeDetails.jsx";

const GeneratedMealCard = ({ recipe }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const buttonOptions = (
    <Button color="secondary" onClick={() => setSelectedMeal(null)}>
      Close
    </Button>
  );

  return (
    <div className="meal-card">
      <div className="meal-card-content">
        <CardTitle>
          <h5 className="meal-card-title text-truncate">{recipe.name}</h5>
        </CardTitle>
        <div className="meal-card-summary">{recipe.summary}</div>
        <div className="meal-card-inspiration">
          Inspired by: {recipe.savedRecipeInspiration}
        </div>
        <div className="meal-card-reasoning">{recipe.inspirationReasoning}</div>
      </div>
      <CardBody>
        <Button className="meal-card-button" color="primary" onClick={() => setSelectedMeal({ ...recipe })}>
          Details
        </Button>
        <Button className="meal-card-button" color="success">
          Save
        </Button>
        <Button className="meal-card-button" color="info">
          Generate DALL-E Image
        </Button>
        {selectedMeal && (
          <RecipeDetails
            meal={selectedMeal}
            buttonOptions={buttonOptions}
            isOpen={selectedMeal !== null}
          />
        )}
      </CardBody>
    </div>
  );
};

export default GeneratedMealCard;