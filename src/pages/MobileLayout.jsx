import React from "react";

const MobileLayout = ({ children }) => {
  return (
    <div className="mobile-container">
      YOU ARE IN THE MOBILE LAYOUT
      {children}
      <div className="mobile-footer">
        {/* Add your mobile footer components here */}
      </div>
    </div>
  );
};

export default MobileLayout;
