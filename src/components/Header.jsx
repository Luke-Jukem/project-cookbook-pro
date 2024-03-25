import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
import FirestoreListener from "../firebase/FirestoreListener.js";
import "../css/styles.css";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const firestoreListener = new FirestoreListener();
  const userCartPath = `Users/${user.uid}/Cart`;
  //opening/closing the cart modal and keeping track of cart item count
  const [modalOpen, setModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const unsubscribeFromCart = firestoreListener.subscribeToCollection(
      userCartPath,
      (docs) => {
        const recipes = docs.map((doc) => doc);
        setCartItems(recipes);
      },
    );

    //cleanup function
    return unsubscribeFromCart;
  }, [user.uid]);

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
            <Link to="/recommendations" className="header--link">
              Recommendations
            </Link>
            <Link to="/health" className="header--link">
              Health
            </Link>
            <Link to="/create-recipe" className="header--link">
              Create Recipe
            </Link>
            <button className="cart-button" onClick={() => setModalOpen(true)}>
              <FaShoppingCart /> Cart ({cartItems.length})
            </button>
            <Cart
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              cartItems={cartItems}
            />
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
