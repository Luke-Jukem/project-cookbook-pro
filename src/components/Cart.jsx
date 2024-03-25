import React, { useState } from "react";
import { Modal } from "reactstrap";
import { useAuth } from "../utils/AuthContext";
import FirestoreService from "../firebase/FirebaseService.js";

const Cart = ({ modalOpen, setModalOpen, cartItems }) => {
  const { user } = useAuth();
  const userCartPath = `Users/${user.uid}/Cart`;
  const [selectedDate, setSelectedDate] = useState(null);

  //logging order data to console (can be removed later)
  const logData = (cartItems, orderData, path, selectedDate) => {
    console.log("Cart items:", cartItems);
    console.log("Order data:", orderData);
    console.log("Path:", path);
    console.log("Selected date:", selectedDate);
  };

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
            <img
              src={recipe.image}
              alt={recipe.name}
              style={{ width: "100px" }}
            />
            <div>
              <h4>{recipe.name}</h4>
              <p>{recipe.amount}</p>
            </div>
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
    </Modal>
  );
};

export default Cart;
