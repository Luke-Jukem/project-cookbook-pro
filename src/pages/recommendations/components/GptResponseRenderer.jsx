import React from "react";

const GptResponseRenderer = ({ response, loading, responseHistory }) => {
  return (
    <div id="gpt-response-container">
      <div id="response-container-label">
        Here are some recipes based on your Saved Recipes preferences:
      </div>
      <div id="response-container">
        {loading && (
          <pre className="pre-style">
            Generating your Recipe Powered by ChatGPT...
          </pre>
        )}
        {responseHistory.map((response, index) => (
          <div key={index} className="response-item">
            <pre className="pre-style">{response}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptResponseRenderer;
