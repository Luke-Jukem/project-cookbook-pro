import React, { useState } from "react";
import { Modal, Button } from "reactstrap";
import RecipeDetails from "../RecipeDetails.jsx";
import OrderManager from "./OrderManager.jsx";
import { useAuth } from "../../utils/AuthContext";
import FirestoreService from "../../firebase/FirebaseService.js";

const Cart = ({ modalOpen, setModalOpen, cartItems }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const { user } = useAuth();
  const userCartPath = `Users/${user.uid}/Cart`;

  const buttonOptions = (
    <Button color="secondary" onClick={() => setSelectedMeal(null)}>
      Close
    </Button>
  );

  const removeFromCart = async (recipeId) => {
    await FirestoreService.deleteDocument(userCartPath, recipeId, "recipe");
  };

  return (
    <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
      <div>
        <h2>Cart ({cartItems.length})</h2>
        {cartItems.map((recipe, index) => (
          <div key={index} className="cart-display">
            <img src={recipe.image} alt={recipe.name} />
            <div>
              <h4>{recipe.name}</h4>
              <p>{recipe.amount}</p>
            </div>
            <button
              className="details-button"
              onClick={() => setSelectedMeal(recipe)}
            >
              Details
            </button>
            <button
              className="remove-button"
              onClick={() => removeFromCart(recipe.id)} // Call removeFromCart function
            >
              Remove
            </button>
          </div>
        ))}
        <OrderManager
          cartItems={cartItems}
          setModalOpen={setModalOpen}
          removeFromCart={removeFromCart}
        />
      </div>
      {selectedMeal && (
        <RecipeDetails
          meal={selectedMeal}
          isOpen={selectedMeal !== null}
          buttonOptions={buttonOptions}
        />
      )}
    </Modal>
  );
};

export default Cart;
