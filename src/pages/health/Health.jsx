import React, { useState } from "react";
import { Row, Col, Container, Spinner } from "reactstrap";
import MacroGoalForm from "./components/MacroGoalForm";
import "./macroGoals.css";

const HealthPage = () => {
  return (
   <div className="health-page">
      <h1 id="health-header">Health Page</h1>
        <MacroGoalForm />
    </div>
  );
};

export default HealthPage;
