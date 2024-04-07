import React from "react";
import OrderHistory from "./OrderHistory";
import UserDataViewer from "../../components/side-container/UserDataViewer";
const OrderHistoryPage = () => {
  return (
    <div>
      <div className="main-container">
        <div className="sidebar-container">
          <UserDataViewer />
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
