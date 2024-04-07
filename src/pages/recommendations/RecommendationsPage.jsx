import React from "react";
import Recommendations from "./components/Recommendations";
import UserRecipesViewer from "../../components/side-container/UserRecipesViewer";
const RecommendationsPage = () => {
  return (
    <div>
      <div className="main-container">
        <div className="sidebar-container">
          <UserRecipesViewer />
        </div>
        <div className="content-container">
          {/* This is where you put the 'Page" file you made previously */}
          <Recommendations />
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
