import React, { useState, useEffect } from "react";
import DisplayGoals from "./components/DisplayGoals.jsx";
import MacroGoalForm from "./components/MacroGoalForm.jsx";
import { useAuth } from "../../utils/AuthContext.js";
import FirestoreListener from "../../firebase/FirestoreListener.js";
import MealDataManager from "../../utils/MealDataManager.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

const Health = ({ recipes }) => {
  const { user } = useAuth();
  const firestoreListener = new FirestoreListener();
  const mealDataManager = new MealDataManager();
  const [showGoals, setShowGoals] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [totalMacros, setTotalMacros] = useState({
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    sugar: 0,
    fat: 0,
  });
  const [macroBreakdownData, setMacroBreakdownData] = useState([
    { name: "Carbohydrates", value: 0, fill: "#FFA500" },
    { name: "Protein", value: 0, fill: "#006400" },
    { name: "Sugar", value: 0, fill: "#FF0000" },
    { name: "Fat", value: 0, fill: "#00008B" },
  ]);

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

 

  const progressData = [
    {
      name: "Calories",
      Goals: 4000,
      Planned: 2400,
      amt: 10,
    },
    {
      name: "Carbs",
      Goals: 3000,
      Planned: 1398,
      amt: 10,
    },
    {
      name: "Protein",
      Goals: 2000,
      Planned: 9800,
      amt: 2290,
    },
    {
      name: "Sugar",
      Goals: 2780,
      Planned: 3908,
      amt: 2000,
    },
    {
      name: "Fat",
      Goals: 1890,
      Planned: 4800,
      amt: 2181,
    },
  ];

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
      {/* Either display goals or prompt user to enter them */}
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
        <p>Calories: {totalMacros.calories} cals</p>
        <p>Carbohydrates: {totalMacros.carbohydrates} g</p>
        <p>Protein: {totalMacros.protein} g</p>
        <p>Sugar: {totalMacros.sugar} g</p>
        <p>Fat: {totalMacros.fat} g</p>
      </div>
      <div>
        <button onClick={fetchAllRecipeDetails} disabled={buttonClicked}>
          Show Results
        </button>
      </div>
      <p>
        <strong>
          *Note: If no results are displayed after the button is pressed, then
          you have no recipes for the selected range of days in the calendar.
        </strong>
      </p>
      <br />
      <br />
      <br />
      {/* Conditionally render Charts if user has selected a meal */}
      {totalMacros.calories > 0 && (
        <div>
          <h1>Your macronutrient breakdown for the selected days (grams)</h1>
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
          <br />
          <br />
          <h1>Progress - How do my planned meals line up with my goals?</h1>
          <br />
          <BarChart
            width={500}
            height={300}
            data={progressData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Planned" stackId="a" fill="#82ca9d" />
            <Bar dataKey="Goals" stackId="a" fill="#FF0000" />
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default Health;
