import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from "reactstrap";

/**
 * the parent of this component creates the button options
 * @param {Recipe} meal
 * @returns
 */
const RecipeDetails = ({ meal, buttonOptions, isOpen, saveData }) => {
  const filteredMeal = { ...meal };
  delete filteredMeal.summary;
  delete filteredMeal.isSaved;
  delete filteredMeal.image;
  delete filteredMeal.instructions;
  const [isClicked, setIsClicked] = useState(false);

  const cartClick = () => {
    setIsClicked(true);
  };

  return (
    <Modal isOpen={isOpen} style={{ maxWidth: "18rem" }}>
      <ModalHeader>{meal.name}</ModalHeader>
      <ModalBody>
        <Container className="d-flex justify-content-center mb-3">
          <img
            src={meal.image}
            alt={""}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </Container>
        {Object.entries(filteredMeal).map(([key, value]) =>
          key === "ingredients" ? (
            <div key={key}>
              <strong>{key}:</strong>
              <ul>
                {value.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div key={key} style={{ wordBreak: "break-word" }}>
              <strong>{key}:</strong> {JSON.stringify(value)}
            </div>
          )
        )}
      </ModalBody>
      <ModalFooter>
        {buttonOptions({ isClicked, cartClick, saveData })}
      </ModalFooter>
    </Modal>
  );
};

export default RecipeDetails;
