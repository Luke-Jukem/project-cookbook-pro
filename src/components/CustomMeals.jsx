import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import RecipeDetails from "./RecipeDetails.jsx";
import { useAuth } from "../utils/AuthContext.js";
import FirestoreService from "../firebase/FirebaseService.js";
import FirestoreListener from "../firebase/FirestoreListener.js";

const CustomMeals = () => {
  const [savedRecipes, setSavedRecipes] = useState([""]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const { user } = useAuth();
  const firestoreListener = new FirestoreListener();

  useEffect(() => {
    const userSavedRecipesPath = `Users/${user.uid}/CustomRecipes`;

    const unsubscribeCustomRecipes = firestoreListener.subscribeToCollection(
      userSavedRecipesPath,
      (docs) => {
        const recipes = docs.map((doc) => doc);
        setSavedRecipes(recipes);
      },
    );

    // Cleanup function
    return unsubscribeCustomRecipes;
  }, [user.uid]);

  async function unsaveRecipeFromCurrentUser(
    collectionPath,
    documentId,
    dataType,
  ) {
    selectedMeal.isSaved = false;
    try {
      await FirestoreService.deleteDocument(
        collectionPath,
        documentId,
        dataType,
      );
    } catch (error) {
      console.error("Error deleting the document:", error);
    }
  }

  const buttonOptions = (
    <>
      <Button
        color="primary"
        onClick={() => {
          unsaveRecipeFromCurrentUser(
            `Users/${user.uid}/CustomRecipes/`,
            String(selectedMeal.id),
            "recipe",
          );
          setSelectedMeal(null);
        }}
      >
        Unsave recipe
      </Button>
      <Button color="secondary" onClick={() => setSelectedMeal(null)}>
        Cancel
      </Button>
    </>
  );

  return (
    <ListGroup>
      {selectedMeal && (
        <RecipeDetails
          meal={selectedMeal}
          isOpen={selectedMeal !== null}
          toggle={() => setSelectedMeal(null)}
          buttonOptions={buttonOptions}
        />
      )}
      {savedRecipes.map((recipe, key) => {
        return (
          <ListGroupItem
            action
            onClick={() => setSelectedMeal(recipe)}
            key={key}
          >
            {recipe.name}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default CustomMeals;
