import React from "react";
import MappedInputFieldsForm from "./MappedInputFieldsForm.jsx";

const RemoveButton = ({ onClick, isVisible }) => (
  <button
    className="ingredient-creation-button"
    type="button"
    onClick={onClick}
    style={{ visibility: isVisible ? "visible" : "hidden" }}
  >
    -
  </button>
);

const IngredientRow = ({
  ingredient,
  index,
  ingredientFields,
  setIngredients,
  handleIngredientSubmit,
  removeIngredient,
  showRemoveButton,
}) => {
  return (
    <div className="ingredient-creation-label-row-container">
      <RemoveButton
        onClick={() => removeIngredient(ingredient.id)}
        isVisible={showRemoveButton}
      />
      <MappedInputFieldsForm
        className={"ingredient-creation-"}
        fields={ingredientFields}
        formData={ingredient}
        defaultValues={{ amount: ingredient.amount || 1 }}
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
    </div>
  );
};

export default IngredientRow;
