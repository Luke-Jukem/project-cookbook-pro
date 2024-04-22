import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext.js";
import FirestoreService from "../../firebase/FirebaseService.js";
import MailBox from "./MailBox.jsx";

const OrderManager = ({ cartItems, setModalOpen, removeFromCart }) => {
  const { user } = useAuth();
  const userOrdersPath = `Users/${user.uid}/Orders`;
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const validateSelectedDate = () => {
    if (!selectedDate) {
      console.log("No date selected");
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const yesterday = new Date(today.getTime() - oneDayInMilliseconds);

    const selectedDateObj = new Date(selectedDate);
    selectedDateObj.setHours(0, 0, 0, 0);

    if (selectedDateObj < yesterday) {
      console.log("Selected date is before today");
      return false;
    }

    return true;
  };

  const createOrder = async () => {
    if (!cartItems || !Array.isArray(cartItems)) {
      console.log("No items in cart or cartItems is not an array");
      return;
    }

    if (!cartItems.every((item) => item.name && item.ingredients)) {
      console.log(
        "One or more items in cartItems does not have a name or ingredients",
      );
      return;
    }

    if (!validateSelectedDate()) {
      return;
    }

    saveOrder();
  };

  const saveOrder = async () => {
    const recipesInCurrentCart = cartItems.map((item) => item.name).sort();

    const aggregateIngredients = (cartItems) => {
      const ingredientsMap = new Map();

      cartItems.forEach((item) => {
        item.ingredients.forEach((ingredient) => {
          const existingIngredient = ingredientsMap.get(ingredient.id);
          if (existingIngredient) {
            existingIngredient.amount += ingredient.amount;
          } else {
            ingredientsMap.set(ingredient.id, {
              id: ingredient.id,
              name: ingredient.name,
              unit: ingredient.unit,
              amount: ingredient.amount,
            });
          }
        });
      });

      return Array.from(ingredientsMap.values()).sort();
    };

    const orderData = {
      recipeNames: recipesInCurrentCart,
      ingredients: aggregateIngredients(cartItems),
    };

    const orderId = `o-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
      await FirestoreService.createDocument(
        userOrdersPath,
        orderId,
        orderData,
        "order",
      );
      setOrderData(orderData);
      setSelectedDate(null);
      setModalOpen(false);
      // Remove each item from the cart after order is saved
      cartItems.forEach((item) => {
        removeFromCart(item.id);
      });
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const handleSubmit = async () => {
    await createOrder();
  };

  return (
    <>
      <div className="cart-date">
        <div>Set Date</div>
        <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {orderData && <MailBox orderData={orderData} />}
    </>
  );
};

export default OrderManager;
