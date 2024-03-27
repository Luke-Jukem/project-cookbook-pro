import React from "react";
import Health from "./components/Health";
import UserRecipesViewer from "../../components/UserRecipesViewer";

const HealthPage = () => {
  return (
    <div>
      <div className="main-container">
        <div className="sidebar-container">
          <UserRecipesViewer />
        </div>
        <div className="content-container">
          {/* This is where you put the 'Page" file you made previously */}
          <Health />
        </div>
      </div>
    </div>
  );
};

export default HealthPage;
