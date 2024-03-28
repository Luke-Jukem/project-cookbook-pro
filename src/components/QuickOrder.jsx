import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Button,
  Input,
} from "reactstrap";
import RecipeDetails from "../components/RecipeDetails";
import { Ingredient } from "../customObjects/Ingredient.js";
import FirestoreService from "../firebase/FirebaseService.js";
import FirestoreListener from "../firebase/FirestoreListener.js";

const quickOrder = () => {
  const [savedRecipes, setSavedRecipes] = useState([""]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [email, setEmail] = useState("");

  const subject = "Your CookBook Pro shopping list";
  const firestoreListener = new FirestoreListener();

  const mailLinkGenerator = () => {
    let body = "";
    if (savedRecipes != "") {
      let recipeList = "";
      const ingredientMap = new Map();
      savedRecipes.forEach((recipe, index) => {
        recipeList += `%0D%0A${index + 1}: ${recipe.name}`;
        recipe.ingredients.forEach((ingredient) => {
          const newIngredient = new Ingredient(
            ingredient.amount,
            ingredient.id,
            ingredient.name,
            ingredient.unit,
          );

          if (ingredientMap.has(newIngredient.id)) {
            const existingIngredient = ingredientMap.get(newIngredient.id);
            existingIngredient.amount += newIngredient.amount;
          } else {
            ingredientMap.set(newIngredient.id, newIngredient);
          }
        });
      });
      body += `This Week's Meals:${recipeList}%0D%0A`;
      body += `%0D%0AIngredients:%0D%0A`;
      ingredientMap.forEach(
        (ingredient) =>
          (body += `[  ] ${ingredient.amount} ${ingredient.unit} ${ingredient.name}\n%0D%0A`),
      );
      body += "%0D%0A";
    }
    return (
      "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      email +
      "&su=" +
      subject +
      "&body=" +
      body
    );
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const toggle = (recipe) => {
    setMeal(recipe);
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    const quickOrderPath = `quickOrder`;

    const unsubscribeFromQuickOrder = firestoreListener.subscribeToCollection(
      quickOrderPath,
      (docs) => {
        const recipes = docs.map((doc) => doc);
        setSavedRecipes(recipes);
      },
    );

    // Cleanup function
    return unsubscribeFromQuickOrder;
  }, []);

  async function removeRecipeFromQuickOrder(
    collectionPath,
    documentId,
    dataType,
  ) {
    try {
      await FirestoreService.deleteDocument(
        collectionPath,
        documentId,
        dataType,
      );
    } catch (error) {
      console.error("Error creating document:", error);
    }
  }

  const buttonOptions = (
    <>
      <Button
        color="primary"
        onClick={() => {
          removeRecipeFromQuickOrder(
            "quickOrder",
            String(selectedMeal.id),
            "recipe",
          );
          setSelectedMeal(null);
        }}
      >
        Remove from order
      </Button>
      <Button color="secondary" onClick={() => setSelectedMeal(null)}>
        Cancel
      </Button>
    </>
  );

  return (
    <>
      {selectedMeal && (
        <RecipeDetails
          meal={selectedMeal}
          isOpen={selectedMeal !== null}
          toggle={() => setSelectedMeal(null)}
          buttonOptions={buttonOptions}
        />
      )}
      <ListGroup>
        <ListGroupItemHeading>Quick Order</ListGroupItemHeading>

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleInputChange}
          required
        />

        <Button
          target="_blank"
          rel="noopener noreferrer"
          href={mailLinkGenerator()}
        >
          send an email to {email}
        </Button>

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
    </>
  );
};

export default quickOrder;
