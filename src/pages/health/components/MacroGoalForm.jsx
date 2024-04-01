import React, { useState } from "react";
import "../macroGoals.css";

const MacroGoalForm = () => {
  const [formData, setFormData] = useState({
    caloriesGoal: "",
    proteinGoal: "",
    carbGoal: "",
    fatGoal: "",
    sugarGoal: "",
  });

  const [isVisible, setIsVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value < 0) {
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Object is returned in console
    setIsVisible(false);
  };

  const handleEdit = () => {
    setIsVisible(true);
  };

  if (!isVisible) {
    return (
      <div className="macro-form-container">
        <p>Goals saved to profile!</p>
        <button onClick={handleEdit}>Edit</button>
      </div>
    );
  }

  const inputStyle = {
    textAlign: "center",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div className="macro-form-container">
      <br />
      <h3>Enter your desired macronutrients below:</h3>
      <p>(You'll be able to go back and edit them later!)</p>
      <br />
      <form onSubmit={handleSubmit} className="input-form-container">
        <label>
          Calorie Goal (cal):
          <input
            style={inputStyle}
            type="number"
            name="caloriesGoal"
            value={formData.caloriesGoal}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Protein Goal (g):
          <input
            style={inputStyle}
            type="number"
            name="proteinGoal"
            value={formData.proteinGoal}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Carbohydrate Goal (g):
          <input
            style={inputStyle}
            type="number"
            name="carbGoal"
            value={formData.carbGoal}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Fat Goal (g):
          <input
            style={inputStyle}
            type="number"
            name="fatGoal"
            value={formData.fatGoal}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Sugar Goal (g):
          <input
            style={inputStyle}
            type="number"
            name="sugarGoal"
            value={formData.sugarGoal}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <button
          type="submit"
          style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MacroGoalForm;
