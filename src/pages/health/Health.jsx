import React from "react";
import DisplayGoals from "./components/DisplayGoals.jsx";
import MacroGoalForm from "./components/MacroGoalForm.jsx";

const Health = () => {
  return (
    <div>
      <MacroGoalForm />
      <DisplayGoals />
    </div>
  );
};

export default Health;
