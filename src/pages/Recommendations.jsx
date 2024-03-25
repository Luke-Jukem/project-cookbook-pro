import React, { useState } from "react";
import GPT from "../components/GPT";

const Recommendations = () => {
  const [toggle, setToggle] = useState(false);

  function toggleRecommendations() {
    setToggle(!toggle);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Recommendations Page</h1>
      <div style={styles.centerContent}>
        <button style={styles.button} onClick={toggleRecommendations}>
          {toggle ? "Hide Recommendations" : "Show Recommendations"}
        </button>
        {toggle && <GPT />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  centerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
};

export default Recommendations;
