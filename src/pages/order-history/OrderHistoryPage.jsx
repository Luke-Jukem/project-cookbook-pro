import React from "react";
import OrderHistory from "./OrderHistory";
import UserRecipesViewer from "../../components/side-container/UserRecipesViewer";
const OrderHistoryPage = () => {
  return (
    <div>
      <div className="main-container">
        <div className="sidebar-container">
          <UserRecipesViewer />
        </div>
        <div className="content-container">
          {/* This is where you put the 'Page" file you made previously */}
          <OrderHistory />
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
