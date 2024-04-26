import React, { useState, useEffect } from "react";
import DisplayGoals from "./components/DisplayGoals.jsx";
import MacroGoalForm from "./components/MacroGoalForm.jsx";
import { useAuth } from "../../utils/AuthContext.js";
import FirestoreListener from "../../firebase/FirestoreListener.js";
import MealDataManager from "../../utils/MealDataManager.js";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const Health = ({ recipes }) => {
  const { user } = useAuth();
  const firestoreListener = new FirestoreListener();
  const mealDataManager = new MealDataManager();

  const [showGoals, setShowGoals] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const [totalMacros, setTotalMacros] = useState({
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    sugar: 0,
    fat: 0,
  });

  useEffect(() => {
    if (user) {
      const path = `Users/${user.uid}/Health/${user.uid}.HealthGoals`;
      const callback = (snapshot) => {
        if (snapshot.exists()) {
          setShowGoals(true);
        } else {
          setShowGoals(false);
        }
      };

      firestoreListener.subscribeToDocument(path, callback);

      return () => {
        firestoreListener.unsubscribe();
      };
    }
  }, []);

  const fetchAllRecipeDetails = async () => {
    const updateTotalMacros = (recipeDetails) => {
      setTotalMacros((prevTotalMacros) => ({
        calories: prevTotalMacros.calories + recipeDetails.calories,
        carbohydrates:
          prevTotalMacros.carbohydrates + recipeDetails.carbohydrates,
        protein: prevTotalMacros.protein + recipeDetails.protein,
        sugar: prevTotalMacros.sugar + recipeDetails.sugar,
        fat: prevTotalMacros.fat + recipeDetails.fat,
      }));
    };

    try {
      setButtonClicked(true);
      for (const recipe of recipes) {
        const recipeDetails = await mealDataManager.fetchRecipeDetails(
          recipe.id
        );
        updateTotalMacros(recipeDetails);
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const actualMacroBreakdownData = [
    { name: "Carbohydrates", value: 15, fill: "#8884d8" },
    { name: "Protein", value: 10, fill: "#00FF00" },
    { name: "Sugar", value: 50, fill: "#FF0000" },
    { name: "Fat", value: 50, fill: "#8B4513" },
  ];

  return (
    <div>
      {showGoals ? (
        <div>
          <DisplayGoals onEdit={() => setShowGoals(false)} />
        </div>
      ) : (
        <div>
          <MacroGoalForm onSubmit={() => setShowGoals(true)} />
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* Display total macros */}
      <div>
        <h3>Total Macros from selected days:</h3>
        <p>Calories: {totalMacros.calories}</p>
        <p>Carbohydrates: {totalMacros.carbohydrates}</p>
        <p>Protein: {totalMacros.protein}</p>
        <p>Sugar: {totalMacros.sugar}</p>
        <p>Fat: {totalMacros.fat}</p>
      </div>
      <div>
        <button onClick={fetchAllRecipeDetails} disabled={buttonClicked}>
          Show Results
        </button>
      </div>
      <br />
      <br />
      <div>
        <h1>Your macronutrient breakdown for the selected days</h1>
        <PieChart width={1000} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={actualMacroBreakdownData}
            cx={200}
            cy={200}
            outerRadius={80}
            label
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default Health;
