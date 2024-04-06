import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Dropdown } from "react-bootstrap";

function UserDropdown({ logoutUser, displayName }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
        <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;
