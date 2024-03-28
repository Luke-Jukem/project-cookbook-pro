import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";
import RecipeDetails from "./RecipeDetails";
import FirestoreService from "../firebase/FirebaseService.js";
import { useAuth } from "../utils/AuthContext";

const MealCard = ({ meal }) => {
  //selected meal is initally set to null
  const [selectedMeal, setSelectedMeal] = useState(null);
  const { user } = useAuth();

  async function saveData(collectionPath, documentId, data, dataType) {
    const savedMeal = meal;
    savedMeal.isSaved = true;
    //savedMeal.instructions kept showing up as null, preventing the recipes from being saved
    if (savedMeal.instructions === undefined) {
      savedMeal.instructions = "";
    }

    // Build the path here with the context provided by the current user
    try {
      await FirestoreService.createDocument(
        collectionPath,
        documentId,
        data,
        dataType,
      );
    } catch (error) {
      console.error("Error creating document:", error);
    }
  }

  const width = { width: "18rem" };

  const cardStyle = {
    border: "2px outset #FFA6A6",
  };

  //button options for RecipeDetails
  const buttonOptions = (
    <>
      <Button
        color="primary"
        onClick={() => {
          saveData(
            `Users/${user.uid}/SavedRecipes/`,
            String(meal.id),
            meal,
            "recipe",
          );
          setSelectedMeal(null); //setting selected meal = null closes the RecipeDetails component
        }}
      >
        Save Recipe
      </Button>
      <Button
        color="secondary"
        onClick={
          () => setSelectedMeal(null) //setting selected meal = null closes the RecipeDetails component
        }
      >
        Close
      </Button>
    </>
  );

  return (
    <Card
      className={"m-2 p-3 flex-fill shadow-sm"}
      style={Object.assign(width, cardStyle)}
    >
      <CardTitle>
        <h5 className="text-truncate m-2 p-0">{meal.name}</h5>
      </CardTitle>
      <CardImg
        className="m-0 border"
        src={meal.image}
        alt={`${meal.name} image`}
      />
      <CardBody>
        <CardText className="text-truncate m-2 p-0">
          {String(meal.summary).replace(/<[^>]*>/g, "")}
        </CardText>
        <Button
          className="card-button"
          color="primary"
          onClick={() => {
            setSelectedMeal({ ...meal });
          }}
        >
          Details
        </Button>
        {
          selectedMeal && (
            <RecipeDetails
              meal={selectedMeal}
              buttonOptions={buttonOptions}
              isOpen={selectedMeal !== null}
            />
          ) /* if selectedMeal is not null, render the RecipeDetails component */
        }
        <Button
          className="card-button"
          onClick={() => {
            saveData(
              `Users/${user.uid}/SavedRecipes/`,
              String(meal.id),
              meal,
              "recipe",
            );
          }}
        >
          Save
        </Button>
        <Button
          className="card-button"
          onClick={() => {
            saveData(
              `Users/${user.uid}/Cart/`,
              String(meal.id),
              meal,
              "recipe",
            );
          }}
        >
          Add to Cart
        </Button>
      </CardBody>
    </Card>
  );
};

export default MealCard;
