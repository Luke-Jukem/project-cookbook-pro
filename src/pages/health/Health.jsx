import React, { useState, useEffect } from "react";
import DisplayGoals from "./components/DisplayGoals.jsx";
import MacroGoalForm from "./components/MacroGoalForm.jsx";
import { useAuth } from "../../utils/AuthContext.js";
import FirestoreListener from "../../firebase/FirestoreListener.js";


const Health = ({ recipes }) => {
  
  const { user } = useAuth();
  const firestoreListener = new FirestoreListener();
  

  const [showGoals, setShowGoals] = useState(true);

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
      </div>
      <br />
    </div>
  );
};

export default Health;
