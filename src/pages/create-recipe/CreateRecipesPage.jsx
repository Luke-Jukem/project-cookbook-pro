import React from "react";
import RecipeCreationForm from "./components/RecipeCreationForm";
import UserDataViewer from "../../components/side-container/UserDataViewer";
const CreateRecipesPage = () => {
  return (
    <div>
      <div className="main-container">
        <div className="sidebar-container">
          <UserDataViewer />
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
