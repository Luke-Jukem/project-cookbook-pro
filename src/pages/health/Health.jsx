import React, { useState, useEffect } from "react";
import DisplayGoals from "./components/DisplayGoals.jsx";
import MacroGoalForm from "./components/MacroGoalForm.jsx";
import { useAuth } from "../../utils/AuthContext.js";
import FirestoreListener from "../../firebase/FirestoreListener.js";
import MealDataManager from "../../utils/MealDataManager.js";
import { Col, Row } from "reactstrap";
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
import "./health.css";

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

  const [userGoals, setUserGoals] = useState({
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    sugar: 0,
    fat: 0,
  });

  const progressData = [
    {
      name: "Calories",
      Goals: userGoals.calories,
      Planned: totalMacros.calories,
      amt: userGoals.calories,
    },
    {
      name: "Carbs",
      Goals: userGoals.carbs,
      Planned: totalMacros.carbohydrates,
      Completion: (totalMacros.carbohydrates / userGoals.carbs) * 100,
    },
    {
      name: "Protein",
      Goals: userGoals.protein,
      Planned: totalMacros.protein,
      Completion: (totalMacros.protein / userGoals.protein) * 100,
    },
    {
      name: "Sugar",
      Goals: userGoals.sugar,
      Planned: totalMacros.sugar,
      Completion: (totalMacros.sugar / userGoals.sugar) * 100,
    },
    {
      name: "Fat",
      Goals: userGoals.fat,
      Planned: totalMacros.fat,
      Completion: (totalMacros.fat / userGoals.fat) * 100,
    },
  ];

  useEffect(() => {
    if (user) {
      const path = `Users/${user.uid}/Health/${user.uid}.HealthGoals`;
      const callback = (snapshot) => {
        if (snapshot.exists()) {
          setUserGoals(snapshot.data());
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
    <div className="grid-container">
      <div id="square-one">
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
      </div>
      <div id="square-two">
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
            *Note: If no results are displayed after the button is pressed, you
            may have to wait a few seconds.
          </strong>
        </p>
      </div>
      {/* Conditionally render Charts if user has selected a meal */}
      <div id="square-three">
        {totalMacros.calories > 0 && (
          <div>
            <h1>Your macronutrient breakdown for the selected days (grams)</h1>
            <p>Hover over sections of the graph for more details.</p>
            <PieChart width={3000} height={400}>
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
            <p>Hover over sections of the graph for more details.</p>
            <br />
            <BarChart
              width={500}
              height={300}
              data={progressData}
              margin={{
                top: 5,
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
              <Bar dataKey="Goals" fill="green" />
              <Bar dataKey="Planned" fill="black" />
            </BarChart>
          </div>
        )}
      </div>
    </div>
  );
};

export default Health;
