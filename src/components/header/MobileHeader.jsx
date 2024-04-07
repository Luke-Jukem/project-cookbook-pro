import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext.js";
import FirestoreListener from "../../firebase/FirestoreListener.js";
import "../../css/styles.css";
import UserDropdown from "./UserDropdown.jsx";

const MobileHeader = () => {
  const { user } = useAuth();
  const firestoreListener = new FirestoreListener();
  //opening/closing the cart modal and keeping track of cart item count

  return (
    <div id="mobile-header" className="header">
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
            <Link to="/order-history" className="header--link">
              Order History
            </Link>
            <UserDropdown />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MobileHeader;
