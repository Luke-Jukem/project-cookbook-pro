import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import ingredientsMap from "../../../customObjects/IngredientMap";
import ".././create-recipe.css";

const CheeserSearchComponent = ({ onIngredientSelect, onClear }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (onClear) {
      setSearchTerm("");
    }
  }, [onClear]);

  // Convert ingredientsMap object to an array
  const ingredientsArray = Object.entries(ingredientsMap);

  // Filter ingredientsArray based on search term
  const filteredIngredients = ingredientsArray.filter(([id, name]) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIngredientClick = (id, name) => {
    onIngredientSelect({ id, name });
  };

  return (
    <div id="cheeser-search" className="d-flex">
      <div id="cheeser-search-box" className="mr-3">
        <Input
          id="cheeser-input"
          type="text"
          placeholder="Search for ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div id="cheeser-list">
        {searchTerm.length >= 3 && (
          <ul className="list-unstyled">
            {filteredIngredients.map(([id, name]) => (
              <li
                className="cheeser-list-item"
                key={id}
                onClick={() => handleIngredientClick(id, name)}
                style={{ cursor: "pointer" }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CheeserSearchComponent;
