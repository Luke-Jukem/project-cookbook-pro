import React, { useState } from "react";
import { Button, Card, CardBody, CardTitle, CardImg, Tooltip, Modal, ModalBody } from "reactstrap";
import RecipeDetails from "../../../components/RecipeDetails.jsx";
import OpenAI from "openai";

const GeneratedMealCard = ({ recipe }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const generateDalleImage = async () => {
    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `Please generate a picture of ${recipe.name} that is a ${recipe.summary} in photorealistic style`,
        n: 1,
        size: "1024x1024",
      });
      setImageURL(response.data[0].url);
      console.log('Image generated successfully:', response.data[0].url);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="meal-card">
      <div className="meal-card-content">
        <CardTitle>
          <h5 className="meal-card-title text-truncate">{recipe.name}</h5>
        </CardTitle>
        <div className="meal-card-inspiration" id={`tooltip-${recipe.id}`}>
          Inspired by: 
          <span onMouseOver={toggleTooltip} onMouseOut={toggleTooltip}>
            {recipe.savedRecipeInspiration}
          </span>
        </div>
        <Tooltip
          placement="top"
          isOpen={tooltipOpen}
          target={`tooltip-${recipe.id}`}
          toggle={toggleTooltip}
        >
          {recipe.inspirationReasoning}
        </Tooltip>
        <div className="meal-card-summary">{recipe.summary}</div>
        {imageURL && (
          <CardImg
            top
            width="100%"
            src={imageURL}
            alt="Generated Recipe Image"
            onClick={toggleModal}
          />
        )}
      </div>
      <CardBody>
        <Button className="meal-card-button" color="primary" onClick={() => setSelectedMeal({ ...recipe })}>
          Details
        </Button>
        <Button className="meal-card-button" color="success">
          Save
        </Button>
        <Button className="meal-card-button" color="info" onClick={generateDalleImage}>
          Generate DALL-E Image
        </Button>
        {selectedMeal && (
          <RecipeDetails
            meal={selectedMeal}
            buttonOptions={buttonOptions}
            isOpen={selectedMeal !== null}
          />
        )}
      </CardBody>
      <Modal isOpen={isModalOpen} toggle={toggleModal} className="modal-lg">
        <ModalBody>
          <img src={imageURL} style={{ width: '100%', height: 'auto' }} alt="Enlarged Recipe Image" />
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GeneratedMealCard;
