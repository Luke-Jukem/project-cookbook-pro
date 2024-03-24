import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import FirestoreService from "../firebase/FirebaseService.js";
import FirestoreListener from "../firebase/FirestoreListener.js";
import "../css/styles.css";

const Header = () => {
  const { user, logoutUser } = useAuth();
  //for opening/closing the cart modal and tracking the amount of items
  const [modalOpen, setModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const firestoreListener = new FirestoreListener();
  const userCartPath = `Users/${user.uid}/Cart`;
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const unsubscribeFromCart = firestoreListener.subscribeToCollection(
      userCartPath,
      (docs) => {
        const recipes = docs.map((doc) => doc);
        setCartItems(recipes);
      },
    );

    // Cleanup function
    return unsubscribeFromCart;
  }, [user.uid]);

  //removing items from cart
  const removeFromCart = async (recipeId) => {
    await FirestoreService.deleteDocument(userCartPath, recipeId, "recipe");
  };

  const logData = (cartItems, orderData, path, selectedDate) => {
    console.log("Cart items:", cartItems);
    console.log("Order data:", orderData);
    console.log("Path:", path);
    console.log("Data:", { recipes: orderData });
    console.log("Selected date:", selectedDate);
  };

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
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div id="header" className="header">
      <div>
        <Link id="header-logo" to="/">
          INSERT LOGO
        </Link>
      </div>
      <div className="links--wrapper">
        {user ? (
          <>
            <Link to="/" className="header--link">
              Home
            </Link>
            <Link to="/search" className="header--link">
              Search
            </Link>
            <Link to="/health" className="header--link">
              Health
            </Link>
            <Link to="/create-recipe" className="header--link">
              Create Recipe
            </Link>
            <button className="cart-button" onClick={() => setModalOpen(true)}>
              <FaShoppingCart /> Cart (
              {cartItems.length /*displays the amount of items in the cart*/})
            </button>
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
              <div>
                <h2>
                  <FaShoppingCart /> Cart ({cartItems.length})
                </h2>
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
            <button onClick={logoutUser} className="btn">
              Logout {user.displayName ? `(${user.displayName})` : ""}
            </button>
          </>
        ) : (
          <Link className="btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
