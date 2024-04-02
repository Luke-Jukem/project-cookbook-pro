import React, { useState } from "react";
import { useAuth } from "../../../utils/AuthContext.js";
import { GoalForm } from "../../../customObjects/GoalForm.js";
import FirestoreService from "../../../firebase/FirebaseService.js";
import MappedInputFieldsForm from "../../../pages/create-recipe/components/MappedInputFieldsForm.jsx";
import "../macroGoals.css";

const MacroGoalForm = () => {
  const { user } = useAuth();

  const [goalFormData, setGoalFormData] = useState({});
  const goalsFields = [
    {
      name: "caloriesGoal",
      label: "Calorie Goal (cal)",
      type: "number",
      placeholder: "Enter Calorie Goal",
      min: 0,
      max: 12000
    },
    {
      name: "proteinGoal",
      label: "Protein Goal (g)",
      type: "number",
      placeholder: "Enter Protein Goal",
      min: 0,
      max: 1000
    },
    {
      name: "carbGoal",
      label: "Carbohydrate Goal (g)",
      type: "number",
      placeholder: "Enter Carbohydrate Goal",
      min: 0,
      max: 1000
    },
    {
      name: "fatGoal",
      label: "Fat Goal (g)",
      type: "number",
      placeholder: "Enter Fat Goal",
      min: 0,
      max: 1000
    },
    {
      name: "sugarGoal",
      label: "Sugar Goal (g)",
      type: "number",
      placeholder: "Enter Sugar Goal",
      min: 0,
      max: 1000
    },
  ];

  const [isVisible, setIsVisible] = useState(true);

  async function handleSubmit() {
    if (!user) {
      alert("Please log in to submit Health Information");
      return;
    }

    const goalsObject = new GoalForm(
      goalFormData.caloriesGoal,
      goalFormData.proteinGoal,
      goalFormData.carbGoal,
      goalFormData.fatGoal,
      goalFormData.sugarGoal,
    );

    console.log("goals Object:", goalsObject);

    const collectionPath = `Users/${user.uid}/Health`;
    const documentId = `${user.uid}.HealthGoals`;
    const dataType = "goalsResponse";
    try {
      await FirestoreService.createDocument(
        collectionPath,
        documentId,
        goalsObject,
        dataType
      );
    } catch (error) {
      console.error("Error creating document:", error);
    }

    console.log(goalFormData);
    // Object is returned in console
    setIsVisible(false);
  }

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

  return (
    <div className="macro-form-container">
      <br />
      <h3>Enter your desired macronutrients below:</h3>
      <p>(You'll be able to go back and edit them later!)</p>
      <br />
      <div className="input-form-container">
        <MappedInputFieldsForm
          fields={goalsFields}
          formData={goalFormData}
          onChange={(e) =>
            setGoalFormData({
              ...goalFormData,
              [e.target.name]: e.target.value,
            })
          }
        />
        <button
          type="button"
          onClick={handleSubmit}
          style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MacroGoalForm;
