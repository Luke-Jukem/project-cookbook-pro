import React, { useState } from "react";
import SavedMeals from "./SavedMeals";
import CustomMeals from "./CustomMeals";
import { useAuth } from "../../utils/AuthContext";
import styled from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ToggleButton = styled.button`
  background-color: ${(props) => (props.active === "true" ? "#ddd" : "#eee")};
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  outline: none;
`;

const UserDataViewer = () => {
  const [currentCollection, setCurrentCollection] = useState("saved");

  const toggleCollection = (collection) => {
    setCurrentCollection(collection);
  };

  const { user } = useAuth();

  return (
    <div>
      <h4 id="user-data-viewer-label">
        {user.displayName
          ? `${user.displayName.split(" ")[0]}'s Recipes`
          : "Your Saved Recipes"}
      </h4>
      <ToggleContainer>
        <ToggleButton
          id="toggle-button-custom"
          active={currentCollection === "custom" ? "true" : undefined}
          onClick={() => toggleCollection("custom")}
          style={{
            fontWeight: currentCollection === "custom" ? "bold" : "normal",
          }}
        >
          Custom
        </ToggleButton>
        <ToggleButton
          id="toggle-button-saved"
          active={currentCollection === "saved" ? "true" : undefined}
          onClick={() => toggleCollection("saved")}
          style={{
            fontWeight: currentCollection === "saved" ? "bold" : "normal",
          }}
        >
          Saved
        </ToggleButton>
      </ToggleContainer>
      {currentCollection === "saved" ? (
        <SavedMeals user={user} />
      ) : (
        <CustomMeals user={user} />
      )}
    </div>
  );
};

export default UserDataViewer;
