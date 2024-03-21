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
  const [showDetails, setShowDetails] = useState(false);
  const toggle = () => {
    setShowDetails(!showDetails);
  };
  const { user } = useAuth();

  async function saveData(collectionPath, documentId, data) {
    /*
        TODO: also refactor to remove showDetails and replace the toggle function
        they are extra and we can achive the same functionality by checking if meal is null or not
        */
    const savedMeal = meal;
    savedMeal.isSaved = true;

    // Build the path here with the context provided by the current user
    try {
      await FirestoreService.createDocument(
        collectionPath,
        documentId,
        data,
        "recipe"
      );
    } catch (error) {
      console.error("Error creating document:", error);
    }
  }

  const width = { width: "18rem" };

  const cardStyle = {
    border: "2px outset #FFA6A6",
  };

  const buttonOptions = (
    <>
      <Button
        color="primary"
        onClick={() => {
          saveData(`Users/${user.uid}/SavedRecipes/`, String(meal.id), meal);
          toggle();
        }}
      >
        Save Recipe
      </Button>
      <Button color="secondary" onClick={toggle}>
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
        <Button color="primary" onClick={toggle}>
          Details
        </Button>
        <RecipeDetails
          meal={meal}
          showDetails={showDetails}
          toggle={toggle}
          buttonOptions={buttonOptions}
        />
        <Button
          onClick={() => {
            saveData("quickOrder", String(meal.id), meal);
          }}
        >
          Add to Quick Order
        </Button>
      </CardBody>
    </Card>
  );
};

export default MealCard;
