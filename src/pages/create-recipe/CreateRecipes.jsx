import React, { useState, useEffect } from "react";
import RecipeBox from "./components/RecipeBox.jsx";
import IngredientBox from "./components/IngredientBox.jsx";
import CheeserSearchComponent from "./components/CheeserSearchComponent.jsx";
import { useAuth } from "../../utils/AuthContext.js";
import { Recipe } from "../../customObjects/Recipe.js";
import { Ingredient } from "../../customObjects/Ingredient.js";
import FirestoreService from "../../firebase/FirebaseService.js";
import "./create-recipe.css";

const CreateRecipes = () => {
  const [recipeFormData, setRecipeFormData] = useState({});
  const [ingredients, setIngredients] = useState([
    {
      amount: "",
      id: Date.now(),
      name: "",
      unit: "",
    },
  ]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (selectedIngredient) {
      // Check if the selectedIngredient already exists in the ingredients array
      const existingIngredient = ingredients.find(
        (ingredient) => ingredient.id === selectedIngredient.id
      );

      if (existingIngredient) {
        // If the selectedIngredient already exists, update its properties
        setIngredients((prevIngredients) =>
          prevIngredients.map((ingredient) =>
            ingredient.id === selectedIngredient.id
              ? selectedIngredient
              : ingredient
          )
        );
      } else {
        // If the selectedIngredient doesn't exist, add it to the ingredients array
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          selectedIngredient,
        ]);
      }
    }
  }, [selectedIngredient]);

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const handleIngredientSubmit = (formData, id) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === id ? formData : ingredient
      )
    );
  };

  const addIngredient = () => {
    const newIngredient = {
      amount: "",
      id: Date.now(),
      name: "",
      unit: "",
    };
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  const removeIngredient = (id) => {
    if (ingredients.length === 1) {
      alert("You must have at least one ingredient for the recipe.");
      return;
    }

    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
  };

  const handleSubmitRecipe = async () => {
    if (!user) {
      alert("Please log in to submit a recipe.");
      return;
    }

    const ingredientObjects = ingredients.map(
      (ingredient) =>
        new Ingredient(
          ingredient.amount,
          ingredient.id,
          ingredient.name,
          ingredient.unit
        )
    );

    const recipeObject = new Recipe(
      recipeFormData.cuisine,
      recipeFormData.dishType,
      recipeFormData.id,
      "",
      ingredientObjects,
      [],
      recipeFormData.name,
      recipeFormData.servings,
      recipeFormData.summary
    );

    const collectionPath = `Users/${user.uid}/CustomRecipes`;
    const documentId = recipeObject.id;
    const dataType = "recipe";

    try {
      await FirestoreService.createDocument(
        collectionPath,
        documentId,
        recipeObject,
        dataType
      );
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div id="recipe-creation-container">
      <div id="recipe-creation-side-container">
        <RecipeBox
          recipeFormData={recipeFormData}
          setRecipeFormData={setRecipeFormData}
          handleSubmitRecipe={handleSubmitRecipe}
        />
        <CheeserSearchComponent onIngredientSelect={handleIngredientSelect} />
      </div>
      <IngredientBox
        ingredients={ingredients}
        setIngredients={setIngredients}
        handleIngredientSubmit={handleIngredientSubmit}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        selectedIngredientData={selectedIngredient}
        setSelectedIngredientData={setSelectedIngredient}
      />
    </div>
  );
};

export default CreateRecipes;
