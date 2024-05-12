import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from "reactstrap";
import DOMPurify from "dompurify";
import customRecipeImage from "../imgs/custom-recipe-placeholder.png";

/**
 * the parent of this component creates the button options
 * @param {Recipe} meal
 * @returns
 */
const RecipeDetails = ({ meal, buttonOptions, isOpen, saveData }) => {
  const filteredMeal = {
    summary: meal.summary,
    ingredients: meal.ingredients,
  };

  const [isClicked, setIsClicked] = useState(false);

  const cartClick = () => {
    setIsClicked(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{ maxWidth: "40rem" }}
      className="modal-window"
    >
      <ModalHeader className="modal-header">{meal.name}</ModalHeader>
      <ModalBody
        className="modal-body"
        style={{ maxHeight: "25rem", overflowY: "auto" }}
      >
        <Container className="d-flex justify-content-center mb-3">
          <img
            src={meal.image ? meal.image : customRecipeImage}
            alt={meal.name}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </Container>
        {Object.entries(filteredMeal).map(([key, value]) =>
          key === "summary" ? (
            <div
              key={key}
              style={{ wordBreak: "break-word" }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(value, { ALLOWED_TAGS: ["b", "a"] }),
              }}
            />
          ) : key === "ingredients" ? (
            <div key={key}>
              <strong>{key}:</strong>
              <ul>
                {value.map((ingredient, index) =>
                  ingredient ? (
                    <li key={index}>
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          ) : (
            <div key={key} style={{ wordBreak: "break-word" }}>
              <strong>{key}:</strong> {JSON.stringify(value)}
            </div>
          )
        )}
      </ModalBody>
      <ModalFooter className="modal-footer">
        {buttonOptions({ isClicked, cartClick, saveData })}
      </ModalFooter>
    </Modal>
  );
};

export default RecipeDetails;
