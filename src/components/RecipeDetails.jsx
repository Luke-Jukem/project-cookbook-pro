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
  //not sure if this code is needed - buttonOptions should always be passed. I've commented it out for now but was too scared to remove it completely.
  // if (!buttonOptions) {
  //   buttonOptions = (
  //     <Button color="secondary" onClick={() => {}}>
  //       Close
  //     </Button>
  //   );
  // }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>{meal.name}</ModalHeader>
      <Container className="d-flex justify-content-center">
        <img src={meal.image} />
      </Container>

      <ModalBody>{String(meal.summary).replace(/<[^>]*>/g, "")}</ModalBody>
      <ModalFooter>{buttonOptions}</ModalFooter>
    </Modal>
  );
};

export default RecipeDetails;
