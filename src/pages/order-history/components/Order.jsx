import React from "react";

const Order = ({ recipeNames, ingredients, orderId }) => {
  return (
    <div className="order-container">
      <h2>Order Details {orderId}</h2>
      <div className="recipe-names">
        <h3>Recipe Names</h3>
        <ul>
          {recipeNames &&
            recipeNames.map((recipe, index) => <li key={index}>{recipe}</li>)}
        </ul>
      </div>
      <div className="ingredients">
        <h3>Ingredients</h3>
        <ul>
          {ingredients &&
            Array.isArray(ingredients) &&
            ingredients.map((ingredient, index) => (
              <li key={index}>
                {typeof ingredient === "object"
                  ? `${ingredient.name} (${ingredient.amount} ${ingredient.unit})`
                  : ingredient}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Order;
