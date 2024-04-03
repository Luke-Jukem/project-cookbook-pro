import React, { useState, useEffect } from "react";
import { useAuth } from "../../../utils/AuthContext.js";
import FirestoreService from "../../../firebase/FirebaseService.js";
import FirestoreListener from "../../../firebase/FirestoreListener.js";

function DisplayGoals() {
  const [goals, setGoals] = useState({});

  const { user } = useAuth();
  const firestoreListener = new FirestoreListener();

  useEffect(() => {
    if (user){
      const path = `Users/${user.uid}/Health/${user.uid}.HealthGoals`; // Create the document path here
      const callback = (snapshot) => {
        if (snapshot.exists()) {
          setGoals(snapshot.data());
        } else {
          setGoals(null);
        }
      };

      firestoreListener.subscribeToDocument(path, callback);

      return () => {
        firestoreListener.unsubscribe();
      };
    }
  }, [user]);

  return (
    <div>
      <h2>Goals</h2>
      <ul>
        <li>Calorie Goal (cal): {goals?.calories}</li>
        <li>Protein Goal (g): {goals?.protein}</li>
        <li>Carbohydrate Goal (g): {goals?.carbs}</li>
        <li>Fat Goal (g): {goals?.fat}</li>
        <li>Sugar Goal (g): {goals?.sugar}</li>
      </ul>
    </div>
  );
}

export default DisplayGoals;
