import React from "react";
import UserRecipesViewer from "../../components/UserRecipesViewer";
import DisplayGoals from "./components/DisplayGoals.jsx";
import MacroGoalForm from "./components/MacroGoalForm.jsx";

const HealthPage = () => {

  return (
    <div>
      <div className="main-container">
        <div className="sidebar-container">
          <UserRecipesViewer />
        </div>
        <div className="content-container">
          {/* This is where you put the 'Page" file you made previously */}
          <MacroGoalForm />
          <DisplayGoals />
        </div>
      </div>
    </div>
  );
};

export default HealthPage;
