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
        calories: data.calories,
        carbohydrates: data.carbs,
        protein: data.protein,
        sugar: sugar,
        fat: data.fat,
      };

      setRecipeDetails(nutritionInfo);
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
      <div>
        <h3>Recipes:</h3>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <p>Recipe Name: {recipe.name}</p>
            <p>Recipe ID: {recipe.id}</p>
            <button onClick={() => fetchRecipeDetails(recipe.id)}>
              Get Recipe Details
            </button>
            {/* Display other recipe details */}
          </div>
        ))}
      </div>
      <br />
      {/* Display recipe details */}
      <pre>{JSON.stringify(recipeDetails, null, 2)}</pre>
    </div>
  );
};

export default Health;
