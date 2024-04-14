import React from "react";

const GptResponseRenderer = ({ response, loading, responseHistory }) => {
  return (
    <div id="response-container">
      <h2>Response History:</h2>
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
  );
};

export default GptResponseRenderer;
