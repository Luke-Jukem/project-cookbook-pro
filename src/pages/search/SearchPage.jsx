import React from "react";
import Search from "./components/Search";
import UserRecipesViewer from "../../components/UserRecipesViewer";
const SearchPage = () => {
  return (
    <div>
      <div className="main-container">
        <div className="sidebar-container">
          <UserRecipesViewer />
        </div>
        <div className="content-container">
          {/* This is where you put the 'Page" file you made previously */}
          <Search />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
