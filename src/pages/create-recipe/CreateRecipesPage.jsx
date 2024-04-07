import React from "react";
import RecipeCreationForm from "./components/RecipeCreationForm";
import UserRecipesViewer from "../../components/side-container/UserRecipesViewer";
const CreateRecipesPage = () => {
  return (
    <div>
      <div className="main-container">
        <div className="sidebar-container">
          <UserRecipesViewer />
        </div>
        <div className="content-container">
          {/* This is where you put the 'Page" file you made previously */}
          <RecipeCreationForm />
        </div>
      </div>
    </div>
  );
};

export default CreateRecipesPage;
