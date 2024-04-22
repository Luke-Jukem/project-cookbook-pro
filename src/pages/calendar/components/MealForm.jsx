import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../calendarStyle.css";
import FirestoreListener from "../../../firebase/FirestoreListener.js";
import { useAuth } from "../../../utils/AuthContext.js";

//form for inputting/selecting meals in calendar
//opens as modal on calendar page
const MealForm = ({ selectedDay, addPlan, closeModal }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [option, setOption] = useState(null);
  const [showText, setShowText] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [customRecipes, setCustomRecipes] = useState([]);
  const { user } = useAuth();
  const firestoreListener = new FirestoreListener();

  const watchAddToCart = watch("autoAddToCart", false);

  useEffect(() => {
    const userSavedRecipesPath = `Users/${user.uid}/SavedRecipes`;
    const userCustomRecipesPath = `Users/${user.uid}/CustomRecipes`;

    const unsubscribeFromSavedRecipes = firestoreListener.subscribeToCollection(
      userSavedRecipesPath,
      (docs) => {
        const recipes = docs.map((doc) => doc);
        setSavedRecipes(recipes);
      },
    );

    const unsubscribeFromCustomRecipes =
      firestoreListener.subscribeToCollection(userCustomRecipesPath, (docs) => {
        const recipes = docs.map((doc) => doc);
        setCustomRecipes(recipes); // You'll need to create this state variable
      });

    return () => {
      firestoreListener.stopListening();
    };
  }, [user.uid]);

  const onSubmit = (data) => {
    addPlan(data.name, data.id, data.autoAddToCart, data.addToCartTime);
    closeModal();
  };

  const handleAddPlan = (event, recipe) => {
    //prevents form from submitting by default before addPlan is used
    event.preventDefault();
    addPlan(recipe, "false", "1");
    closeModal();
  };

  return (
    //planning to change most of this to a drag-and-drop interface
    <form onSubmit={handleSubmit(onSubmit)} className="meal-form-container">
      <button type="button" onClick={closeModal} className="exit-button">
        X
      </button>
      {!option && (
        <div>
          <button
            type="button"
            className="option-button"
            onClick={() => setOption("Saved")}
            onMouseEnter={() => setShowText("Choose from your saved recipes.")}
            onMouseLeave={() => setShowText("")}
          >
            Saved
          </button>
          <button
            type="button"
            className="option-button"
            onClick={() => setOption("Custom")}
            onMouseEnter={() => setShowText("Input a custom meal.")}
            onMouseLeave={() => setShowText("")}
          >
            Custom
          </button>
        </div>
      )}
      {showText && <p>{showText}</p>}
      {option === "Saved" && (
        <div>
          {savedRecipes.map((recipe, index) => (
            <div key={index} className="meal-entry">
              <img src={recipe.image} alt={""} />
              <p>{recipe.name}</p>
              <button onClick={(event) => handleAddPlan(event, recipe)}>
                Add
              </button>
            </div>
          ))}
        </div>
      )}
      {option === "Custom" && (
        <div>
          {customRecipes.map((recipe, index) => (
            <div key={index} className="meal-entry">
              <img src={recipe.image} alt={""} />
              <p>{recipe.name}</p>
              <button onClick={(event) => handleAddPlan(event, recipe)}>
                Add
              </button>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default MealForm;
