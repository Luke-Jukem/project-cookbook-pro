import React from "react";
import UserDataViewer from "../../components/side-container/UserDataViewer.jsx";
import DisplayGoals from "./components/DisplayGoals.jsx";
import MacroGoalForm from "./components/MacroGoalForm.jsx";

const HealthPage = () => {
  return (
    <div>
      <div className="main-container">
        <div className="sidebar-container">
          <UserDataViewer />
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
