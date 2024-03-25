import React, { useState } from "react";
import { Modal, Button } from "reactstrap";
import { useAuth } from "../utils/AuthContext";
import FirestoreService from "../firebase/FirebaseService.js";
import RecipeDetails from "./RecipeDetails";

const Cart = ({ modalOpen, setModalOpen, cartItems }) => {
  const { user } = useAuth();
  const userCartPath = `Users/${user.uid}/Cart`;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

  //logging order data to console (can be removed later)
  const logData = (cartItems, orderData, path, selectedDate) => {
    console.log("Cart items:", cartItems);
    console.log("Order data:", orderData);
    console.log("Path:", path);
    console.log("Selected date:", selectedDate);
  };

  //button options for RecipeDetails
  const buttonOptions = (
    <Button color="secondary" onClick={() => setSelectedMeal(null)}>
      Close
    </Button>
  );

  //removing items from cart
  const removeFromCart = async (recipeId) => {
    await FirestoreService.deleteDocument(userCartPath, recipeId, "recipe");
  };

  //creating orders
  const createOrder = async () => {
    if (!selectedDate || !cartItems) {
      console.log("No date selected or no items in cart");
      return;
    }

    if (!Array.isArray(cartItems)) {
      console.log("cartItems is not an array:", cartItems);
      return;
    }

    if (!cartItems.every((item) => item.name && item.ingredients)) {
      console.log(
        "One or more items in cartItems does not have a name or ingredients",
      );
      return;
    }

    //ensuring the user doesn't select a date that's in the past
    const today = new Date();
    const selectedDateObj = new Date(selectedDate);
    //sets time 0 to match selectedDateObj
    today.setHours(0, 0, 0, 0);

    if (selectedDateObj < today) {
      console.log("Selected date is before today");
      return;
    }

    const orderData = cartItems.map((item) => ({
      name: item.name,
      ingredients: item.ingredients,
    }));

    const path = `Users/${user.uid}/Orders`;

    logData(cartItems, orderData, path, selectedDate);

    try {
      await FirestoreService.createDocument(
        `Users/${user.uid}/Orders`,
        selectedDate,
        { recipes: orderData },
        "order",
      );
      console.log("Order created successfully");
      //removing all items from cart after an order is placed
      for (const item of cartItems) {
        await removeFromCart(item.id);
      }
    } catch (error) {
      console.error("Error creating document:", error);
    }
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
              onClick={() => removeFromCart(recipe.id)}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="cart-date">
          <button onClick={createOrder}>Set Date</button>
          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
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
