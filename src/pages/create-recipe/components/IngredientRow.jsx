import React from "react";
import MappedInputFieldsForm from "./MappedInputFieldsForm.jsx";

const IngredientRow = ({
  ingredient,
  index,
  ingredientFields,
  setIngredients,
  handleIngredientSubmit,
  removeIngredient,
  isFirstRow,
}) => {
  return (
    <div className="ingredient-creation-label-row-container">
      {ingredient.id ? (
        <>
          <button
            className="ingredient-creation-button"
            type="button"
            onClick={() => removeIngredient(ingredient.id)}
          >
            -
          </button>
          <MappedInputFieldsForm
            className={"ingredient-creation-"}
            fields={ingredientFields}
            formData={ingredient}
            defaultValues={{ amount: ingredient.amount || 1 }} // Set default value for "amount" field
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
        </>
      ) : (
        <>
          {isFirstRow ? (
            <>
              <button
                className="ingredient-creation-button invisible"
                type="button"
              >
                +
              </button>
              <MappedInputFieldsForm
                className={"ingredient-creation-"}
                fields={ingredientFields}
                formData={ingredient}
                defaultValues={{ amount: 1 }} // Set default value for "amount" field
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
            </>
          ) : (
            <button
              className="ingredient-creation-button"
              type="button"
              onClick={() =>
                setIngredients((prevIngredients) => [
                  ...prevIngredients,
                  { id: Date.now() },
                ])
              }
            >
              +
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default IngredientRow;
