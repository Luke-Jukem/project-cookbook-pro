import React from "react";
import Search from "./components/Search";
import UserDataViewer from "../../components/side-container/UserDataViewer";
const SearchPage = () => {
  return (
    <div>
      <div className="main-container">
        <div className="sidebar-container">
          <UserDataViewer />
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
