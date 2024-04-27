import React, { useEffect } from "react";
import MappedInputFieldsForm from "./MappedInputFieldsForm.jsx";
import "../create-recipe.css";

const IngredientBox = ({
  ingredients,
  setIngredients,
  handleIngredientSubmit,
  addIngredient,
  removeIngredient,
  selectedIngredient,
  setSelectedIngredient,
}) => {
  const ingredientFields = [
    {
      name: "amount",
      label: "Amount",
      type: "text",
      placeholder: "Enter amount",
    },
    {
      name: "id",
      label: "ID",
      type: "text",
      placeholder: "Enter ingredient ID",
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter ingredient name",
    },
    { name: "unit", label: "Unit", type: "text", placeholder: "Enter unit" },
  ];

  useEffect(() => {
    if (selectedIngredient) {
      // Check if the selectedIngredient already exists in the ingredients array
      const existingIngredient = ingredients.find(
        (ingredient) => ingredient.id === selectedIngredient.id
      );

      if (existingIngredient) {
        // If the selectedIngredient already exists, update its properties
        setIngredients((prevIngredients) =>
          prevIngredients.map((ingredient) =>
            ingredient.id === selectedIngredient.id
              ? selectedIngredient
              : ingredient
          )
        );
      } else {
        // If the selectedIngredient doesn't exist, add it to the ingredients array
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          selectedIngredient,
        ]);
      }
    }
  }, [selectedIngredient, ingredients, setIngredients]);

  return (
    <div id="ingredient-container">
      <div className="creation-title">Ingredient Information:</div>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <MappedInputFieldsForm
            className={"recipe-creation-"}
            fields={ingredientFields.map((field) =>
              field.name === "id" && ingredient.id === Date.now()
                ? { ...field, disabled: true }
                : field
            )}
            formData={ingredient}
            onChange={(e) =>
              setIngredients((prevIngredients) =>
                prevIngredients.map((prevIngredient, i) =>
                  i === index
                    ? { ...prevIngredient, [e.target.name]: e.target.value }
                    : prevIngredient
                )
              )
            }
            onSubmit={handleIngredientSubmit}
          />
          {ingredients.length > 1 && (
            <button
              className="create-recipe-button"
              type="button"
              onClick={() => removeIngredient(ingredient.id)}
            >
              Remove Ingredient
            </button>
          )}
        </div>
      ))}
      {selectedIngredient && (
        <div id="selected-ingredient-container">
          <MappedInputFieldsForm
            fields={ingredientFields}
            formData={selectedIngredient}
            onChange={(e) =>
              setSelectedIngredient({
                ...selectedIngredient,
                [e.target.name]: e.target.value,
              })
            }
            className={"recipe-creation-"}
            onSubmit={() => {
              if (!selectedIngredient.id) {
                addIngredient(selectedIngredient);
              } else {
                handleIngredientSubmit(
                  selectedIngredient,
                  selectedIngredient.id
                );
              }
            }}
          />
        </div>
      )}
      <button
        className="create-recipe-button"
        type="button"
        onClick={addIngredient}
      >
        Add New Ingredient
      </button>
    </div>
  );
};

export default IngredientBox;
