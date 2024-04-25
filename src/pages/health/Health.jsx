import React, { useState, useEffect } from "react";
import DisplayGoals from "./components/DisplayGoals.jsx";
import MacroGoalForm from "./components/MacroGoalForm.jsx";
import { useAuth } from "../../utils/AuthContext.js";
import FirestoreListener from "../../firebase/FirestoreListener.js";

const Health = ({ recipes }) => {
  const { user } = useAuth();
  const firestoreListener = new FirestoreListener();

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

  console.log(recipes);

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

  const fetchRecipeDetails = async (recipeId) => {
    const apiKey = "c70a0f5d5e1f4e18bb55c4bfbc94ab1c";
    const url = `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      let sugar = "N/A";
      for (const item of data.bad) {
        if (item.title === "Sugar") {
          sugar = item.amount;
          break;
        }
      }
      const nutritionInfo = {
        calories: parseFloat(data.calories),
        carbohydrates: parseFloat(data.carbs),
        protein: parseFloat(data.protein),
        sugar: sugar !== "N/A" ? parseFloat(sugar) : "N/A",
        fat: parseFloat(data.fat),
      };

      setRecipeDetails(nutritionInfo);

      // Update total macros
      setTotalMacros((prevTotalMacros) => ({
        calories: prevTotalMacros.calories + nutritionInfo.calories,
        carbohydrates:
          prevTotalMacros.carbohydrates + nutritionInfo.carbohydrates,
        protein: prevTotalMacros.protein + nutritionInfo.protein,
        sugar:
          nutritionInfo.sugar !== "N/A"
            ? prevTotalMacros.sugar + nutritionInfo.sugar
            : prevTotalMacros.sugar,
        fat: prevTotalMacros.fat + nutritionInfo.fat,
      }));
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const fetchAllRecipeDetails = () => {
    recipes.forEach((recipe) => {
      fetchRecipeDetails(recipe.id);
    });
    setButtonClicked(true);
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
      <div>
        <h3>Recipes:</h3>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <p>Recipe Name: {recipe.name}</p>
            <p>Recipe ID: {recipe.id}</p>
            {/* Display other recipe details */}
          </div>
        ))}
        <button onClick={fetchAllRecipeDetails} disabled={buttonClicked}>
          Get your Recipe's Macros
        </button>
      </div>
      <br />
      {/* Display total macros */}
      <div>
        <h3>Total Macros:</h3>
        <p>Calories: {totalMacros.calories}</p>
        <p>Carbohydrates: {totalMacros.carbohydrates}</p>
        <p>Protein: {totalMacros.protein}</p>
        <p>Sugar: {totalMacros.sugar}</p>
        <p>Fat: {totalMacros.fat}</p>
      </div>
    </div>
  );
};

export default Health;
