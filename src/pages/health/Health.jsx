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

  const [macroBreakdownData, setMacroBreakdownData] = useState([
    { name: "Carbohydrates", value: 0, fill: "#FFA500" },
    { name: "Protein", value: 0, fill: "#006400" },
    { name: "Sugar", value: 0, fill: "#FF0000" },
    { name: "Fat", value: 0, fill: "#00008B" },
  ]);

  const fetchAllRecipeDetails = async () => {
    try {
      setButtonClicked(true);

      let newTotalMacros = {
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        sugar: 0,
        fat: 0,
      };

      for (const recipe of recipes) {
        const recipeDetails = await mealDataManager.fetchRecipeDetails(
          recipe.id
        );
        newTotalMacros = {
          calories: newTotalMacros.calories + recipeDetails.calories,
          carbohydrates:
            newTotalMacros.carbohydrates + recipeDetails.carbohydrates,
          protein: newTotalMacros.protein + recipeDetails.protein,
          sugar: newTotalMacros.sugar + recipeDetails.sugar,
          fat: newTotalMacros.fat + recipeDetails.fat,
        };
      }

      // Update total macros and pie chart data after calculating total macros
      setTotalMacros(newTotalMacros);
      setMacroBreakdownData((prevData) =>
        prevData.map((item) => ({
          ...item,
          value: newTotalMacros[item.name.toLowerCase()],
        }))
      );
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

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
      {/* Conditionally render the h1 and PieChart */}
      {totalMacros.calories > 0 && (
        <div>
          <h1>Your macronutrient breakdown for the selected days</h1>
          <PieChart width={1000} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={macroBreakdownData}
              cx={200}
              cy={200}
              outerRadius={80}
              label
              stroke="black" 
              strokeWidth={2} 
            />
            <Tooltip />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default Health;
