import React from "react";
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
const RecipeDetails = ({ meal, buttonOptions, isOpen }) => {
  const filteredMeal = { ...meal };
  delete filteredMeal.summary;
  delete filteredMeal.isSaved;
  delete filteredMeal.image;
  delete filteredMeal.instructions;

  return (
    <Modal isOpen={isOpen} style={{ maxWidth: "40rem" }} className="modal-window">
      <ModalHeader className="modal-header">{meal.name}</ModalHeader>
      <ModalBody className="modal-body" style={{maxHeight: "25rem", overflowY: "auto"}}>
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
                {value.map((ingredient, index) =>
                  // In case we get a bad ingredient from GPT, we perform a null check
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
      <ModalFooter className="modal-footer">{buttonOptions}</ModalFooter>
    </Modal>
  );
};

export default RecipeDetails;
