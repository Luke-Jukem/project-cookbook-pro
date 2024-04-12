import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import FirestoreService from "../../../firebase/FirebaseService";
import { useAuth } from "../../../utils/AuthContext.js";
import "../recommendations.css";

const GPT = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [recipeNames, setRecipeNames] = useState([]);
  const [responseHistory, setResponseHistory] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Clear any previous errors and responses
    setError("");
    setResponse("");

    if (!user || !user.uid) {
      setError("User not authenticated.");
      return;
    }

    // Fetch saved recipes
    const getSavedRecipes = async () => {
      const collectionPath = `Users/${user.uid}/SavedRecipes`;
      try {
        const allDocuments = await FirestoreService.getAllDocuments(
          collectionPath,
          "recipes"
        );
        const names = allDocuments.map((doc) => doc.data.name);
        return names; // Return the names for use below
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
        throw new Error("Failed to fetch saved recipes.");
      }
    };

    try {
      const recipeNames = await getSavedRecipes(); // Ensure this completes before moving on
      setRecipeNames(recipeNames); // Update the state with the names

      // Prepare for OpenAI request
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
      const gptModel = "gpt-4-0125-preview";
      const recipeListString = recipeNames.join(", ");
      const systemMessageContent = `You are a recipe recommendation system. You must respond with a recipe to the user, you cannot ask clarifying questions, and you cannot refuse to generate a recipe. Your response for the recipe should include Cuisine type, dishType (example: Main course, dinner), name, servings, a summary including instructions, ingredients and their amounts. The text will be displayed on a webpage for the user to view, so it should be easy to read,presentable, and organized in a way that resembles a cookbook. Your response should take in to account both the user prompt and saved recipes. Your generated recipe should be reflective of the users taste based on saved recipes, but you should ensure that the recipe isn't overly similar to their saved recipess. The user's previously saved recipes include: ${recipeListString}.`;
      console.log(systemMessageContent); // Optional: logging for debug

      const userMessage = [
        { role: "system", content: systemMessageContent },
        { role: "user", content: message },
      ];

      const completion = await openai.chat.completions.create({
        model: gptModel,
        messages: userMessage,
      });

      // Process and handle OpenAI response
      const assistantResponse = completion.choices?.find(
        (choice) => choice.message.role === "assistant"
      );
      if (assistantResponse) {
        setResponse(assistantResponse.message.content);
        setResponseHistory((prevHistory) => [
          assistantResponse.message.content,
          ...prevHistory,
        ]);
        setLoading(false);
        const collectionPath = `Users/${user.uid}/generatedRecipes`;
        const documentId = `gpt-${Date.now()}-${Math.floor(
          Math.random() * 1000
        )}`;
        const gptResponse = {
          userMessage: message,
          assistantResponse: assistantResponse.message.content,
        };
        await FirestoreService.createDocument(
          collectionPath,
          documentId,
          gptResponse,
          "gptResponse"
        );
      } else {
        throw new Error("Assistant response not found");
      }
    } catch (error) {
      setLoading(false);
      setError("Error: " + error.message);
      console.error("Error:", error);
    }
  }

  return (
    <div id="chat-container">
      <h1>ChatGPT</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <input type="text" value={message} onChange={handleChange} />
        </label>
        <button type="submit">Send</button>
      </form>
      {error && <div>Error: {error}</div>}
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
    </div>
  );
};

export default GPT;
