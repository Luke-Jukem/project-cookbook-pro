import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import "../css/styles.css";

const Header = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logoutClick = () => {
    logoutUser();
    navigate("/login");
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
            <Link to="/calendar" className="header--link">
              Calendar
            </Link>
            <div className="dropdown">
              <button onClick={toggleDropdown} className="btn" id="user-bubble">
                {user.displayName}
              </button>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <button onClick={logoutClick} className="dropdown-item">
                    Profile
                  </button>
                  <button onClick={logoutClick} className="dropdown-item">
                    Settings
                  </button>
                  <button onClick={logoutClick} className="dropdown-item">
                    Logout
                  </button>
                </div>
              )}
            </div>
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
