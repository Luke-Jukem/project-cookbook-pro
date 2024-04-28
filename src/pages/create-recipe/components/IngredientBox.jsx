import React, { useEffect } from "react";
import IngredientRow from "./IngredientRow.jsx";
import "../create-recipe.css";

const IngredientBox = ({
  ingredients,
  setIngredients,
  handleIngredientSubmit,
  selectedIngredient,
  setSelectedIngredient,
}) => {
  const ingredientFields = [
    {
      name: "amount",
      label: "Amount",
      type: "text",
      placeholder: "Enter amount",
      defaultValue: 1,
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter ingredient name",
    },
    {
      name: "unit",
      label: "Unit",
      type: "select",
      placeholder: "Select unit",
      options: [
        { value: "g", label: "Grams" },
        { value: "ml", label: "Milliliters" },
        { value: "cup", label: "Cup" },
        { value: "tsp", label: "Teaspoon" },
        { value: "tbsp", label: "Tablespoon" },
      ],
    },
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

  const removeIngredient = (id) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
  };

  return (
    <div id="ingredient-container">
      <div id="ingredient-title" className="creation-title">
        Ingredient Information:
      </div>
      <div id="ingredient-list-container">
        {ingredients.map((ingredient, index) => (
          <IngredientRow
            key={ingredient.id || index}
            ingredient={ingredient}
            index={index}
            ingredientFields={ingredientFields}
            setIngredients={setIngredients}
            handleIngredientSubmit={handleIngredientSubmit}
            removeIngredient={removeIngredient}
            isFirstRow={index === 0}
          />
        ))}
        {ingredients.length === 0 && (
          <IngredientRow
            ingredient={{}}
            index={0}
            ingredientFields={ingredientFields}
            setIngredients={setIngredients}
            handleIngredientSubmit={handleIngredientSubmit}
            removeIngredient={removeIngredient}
            isFirstRow
          />
        )}
        {ingredients.length > 0 && (
          <IngredientRow
            ingredient={{}}
            index={ingredients.length}
            ingredientFields={ingredientFields}
            setIngredients={setIngredients}
            handleIngredientSubmit={handleIngredientSubmit}
            removeIngredient={removeIngredient}
            isFirstRow={false}
          />
        )}
      </div>
    </div>
  );
};

export default IngredientBox;
