import React, { useState } from "react";
import { useAuth } from "../../../utils/AuthContext.js";
import FirestoreService from "../../../firebase/FirebaseService.js";
import MappedInputFieldsForm from "../../../pages/create-recipe/components/MappedInputFieldsForm.jsx";
import "../macroGoals.css";

const MacroGoalForm = () => {
  const { user } = useAuth();

  const [goalFormData, setGoalFormData] = useState({});
  const goalsFields = [
    { name: "id", label: "ID", type: "text", placeholder: "Enter Form ID" },
    {
      name: "caloriesGoal",
      label: "Calorie Goal (cal)",
      type: "number",
      placeholder: "Enter Calorie Goal",
    },
    {
      name: "proteinGoal",
      label: "Protein Goal (g)",
      type: "number",
      placeholder: "Enter Protein Goal",
    },
    {
      name: "carbGoal",
      label: "Carbohydrate Goal (g)",
      type: "number",
      placeholder: "Enter Carbohydrate Goal",
    },
    {
      name: "fatGoal",
      label: "Fat Goal (g)",
      type: "number",
      placeholder: "Enter Fat Goal",
    },
    {
      name: "sugarGoal",
      label: "Sugar Goal (g)",
      type: "number",
      placeholder: "Enter Sugar Goal",
    },
  ];

  const [isVisible, setIsVisible] = useState(true);

  async function handleSubmit() {
    if (!user) {
      alert("Please log in to submit Health Information");
      return;
    }

    const goalsObject = new goalsFields(
      goalFormData.caloriesGoal,
      goalFormData.fat,
      recipeFormData.id,
      "", // image is an empty string for now
      ingredientObjects,
      [], // instructions is an empty array for now
      recipeFormData.name,
      recipeFormData.servings,
      recipeFormData.summary
    );

    // Write the new Recipe to the User's CustomRecipes collection
    console.log("Recipe Object:", goalsObject);

    // const collectionPath = `Users/${user.uid}/CustomRecipes`;
    // const documentId = recipeObject.id;
    // const dataType = "recipe";
    // try {
    //   await FirestoreService.createDocument(
    //     collectionPath,
    //     documentId,
    //     recipeObject,
    //     dataType,
    //   );
    // } catch (error) {
    //   console.error("Error creating document:", error);
    // }

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
      <form className="input-form-container">
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
      </form>
    </div>
  );
};

export default MacroGoalForm;
