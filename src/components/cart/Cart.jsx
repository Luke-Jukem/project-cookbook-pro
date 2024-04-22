import React, { useState } from "react";
import { Modal, Button } from "reactstrap";
import RecipeDetails from "../RecipeDetails.jsx";
import OrderManager from "./OrderManager.jsx";
import { useAuth } from "../../utils/AuthContext";
import FirestoreService from "../../firebase/FirebaseService.js";

const Cart = ({ modalOpen, setModalOpen, cartItems, type }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const { user } = useAuth();
  //if the cart is being used from the calendar, change the path so the real cart isn't affected
  const userCartPath =
    type === "calendar"
      ? `Users/${user.uid}/CalendarCart`
      : `Users/${user.uid}/Cart`;

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
            {type !== "calendar" && ( //if the cart is being used from the calendar, don't show the remove button
              <button
                className="remove-button"
                onClick={() => removeFromCart(recipe.id)}
              >
                Remove
              </button>
            )}
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
