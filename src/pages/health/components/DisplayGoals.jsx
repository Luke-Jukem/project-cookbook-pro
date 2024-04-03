import React, { useState, useEffect } from "react";
import { useAuth } from "../../../utils/AuthContext.js";
import FirestoreService from "../../../firebase/FirebaseService.js";
import FirestoreListener from "../../../firebase/FirestoreListener.js";

function DisplayGoals() {
  const [goals, setGoals] = useState({});

  const { user } = useAuth();
  const firestoreListener = new FirestoreListener();

  useEffect(() => {
    if (user) {
      const userSavedGoalsPath = `Users/${user.uid}/Health/${user.uid}.HealthGoals`;
      console.log(userSavedGoalsPath);

      const fetchGoals = firestoreListener.subscribeToDocument(
        userSavedGoalsPath,
        (doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setGoals(userData.goals);
          }
        },
      );

      return fetchGoals;
    }
  }, [user]);

  return (
    <div>
      <h2>Goals</h2>
      <ul>
        <li>Calories Goal: {goals?.calories}</li>
        <li>Protein Goal: {goals?.protein}</li>
        <li>Carbohydrate Goal: {goals?.carbs}</li>
        <li>Fat Goal: {goals?.fat}</li>
        <li>Sugar Goal: {goals?.sugar}</li>
      </ul>
    </div>
  );
}

export default DisplayGoals;
