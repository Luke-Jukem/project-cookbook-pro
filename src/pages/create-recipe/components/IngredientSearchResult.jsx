import React from "react";
import "../create-recipe.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "reactstrap";

const IngredientSearchResult = ({ ingredientData, onClick }) => {
  const {
    name,
    image,
    calories,
    fiber,
    sugar,
    carbohydrates,
    fat,
    protein,
    sodium,
    servingWeight,
    servingUnit,
  } = ingredientData;

  return (
    <Card className="mb-3" onClick={onClick} style={{ cursor: "pointer" }}>
      <CardBody>
        <Row>
          <Col xs="3">
            {image && (
              <img
                src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
                alt={name}
                className="img-fluid"
              />
            )}
          </Col>
          <Col xs="9">
            <CardTitle tag="h5">{name}</CardTitle>
            <CardText>
              Serving: {servingWeight} {servingUnit}
            </CardText>
            <ListGroup flush>
              <Row>
                <Col xs="6">
                  <ListGroupItem>
                    Calories: {calories ? calories.toFixed(1) : "N/A"} kcal
                  </ListGroupItem>
                  <ListGroupItem>
                    Carbs: {carbohydrates ? carbohydrates.toFixed(1) : "N/A"} g
                  </ListGroupItem>
                  <ListGroupItem>
                    Protein: {protein ? protein.toFixed(1) : "N/A"} g
                  </ListGroupItem>
                  <ListGroupItem>
                    Fat: {fat ? fat.toFixed(1) : "N/A"} g
                  </ListGroupItem>
                </Col>
                <Col xs="6">
                  <ListGroupItem>
                    Fiber: {fiber ? fiber.toFixed(1) : "N/A"} g
                  </ListGroupItem>
                  <ListGroupItem>
                    Sugar: {sugar ? sugar.toFixed(1) : "N/A"} g
                  </ListGroupItem>
                  <ListGroupItem>
                    Sodium: {sodium ? sodium.toFixed(1) : "N/A"} mg
                  </ListGroupItem>
                </Col>
              </Row>
            </ListGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default IngredientSearchResult;
