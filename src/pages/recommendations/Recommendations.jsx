import React from "react";
import GPT from "./components/GPT";
import "./recommendations.css";

const Recommendations = () => {
  return (
    <div id="recommendations-container">
      <h1 id="recommendations-heading">Welcome to the Recommendations Page</h1>
      <div id="center-content">
        <GPT />
      </div>
    </div>
  );
};

export default Recommendations;
