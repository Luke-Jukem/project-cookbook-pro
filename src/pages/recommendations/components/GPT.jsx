import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import FirestoreService from "../../../firebase/FirebaseService";
import { useAuth } from "../../../utils/AuthContext.js";
const GPT = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [recipeNames, setRecipeNames] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const getSavedRecipes = async () => {
    try {
      const collectionPath = `Users/${user.uid}/SavedRecipes`;
      const dataType = "recipes";

      const allDocuments = await FirestoreService.getAllDocuments(
        collectionPath,
        dataType,
      );

      const names = allDocuments.map((doc) => doc.name);
      setRecipeNames(names); // Update the state with the extracted names

    } catch (error) {
      console.error("Error: No saved recipes fetched.", error);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      // Ensure user is loaded before calling
      getSavedRecipes();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Clear any previous errors

    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      // Model settings
      const gptModel = "gpt-4-0125-preview";

      //Build SystemMessage
      const json_object = [
          { name: "cuisine", label: "Cuisine", type: "text" },
          { name: "dishType", label: "Dish Type", type: "text" },
          {
            name: "id",
            label: "ID",
            type: "text",
            placeholder: "Enter recipe ID",
          },
          { name: "dishType", label: "Dish Type", type: "text" },
          { name: "servings", label: "Servings", type: "number" },
          { name: "summary", label: "Summary", type: "textarea" },
        ],
        json_string = JSON.stringify(json_object, null, 2);

      const recipeListString = recipeNames.join(", "); // Convert array of names to a string
      const systemMessageContent = `You are a recipe recommendation system that uses user preferences to generate recipes that match the user's tastes without recommending food they've recently viewed or already saved. Previously saved recipes include: ${recipeListString}. Do not ask clarifying questions, you must give the user a recipe. Your response should be a JSON object that fits this format: ${json_string}`;

      const userMessage = [
        {
          role: "system",
          content: systemMessageContent,
        },
        { role: "user", content: message }, // Message with user inputted message
      ];

      const completion = await openai.chat.completions.create({
        model: gptModel,
        messages: userMessage, // Fill User input
      });

      if (!completion || !completion.choices || !completion.choices.length) {
        throw new Error("Invalid response from server");
      }

      const assistantResponse = completion.choices.find(
        (choice) => choice.message.role === "assistant",
      );

      // Check for ChatGPT error
      if (assistantResponse) {
        setResponse(assistantResponse.message.content);

        // Firebase document creation
        const collectionPath = `Users/${user.uid}/generatedRecipes`;
        const documentId = `gpt-${Date.now()}-${Math.floor(
          Math.random() * 1000,
        )}`;
        const gptResponse = {
          userMessage: message,
          assistantResponse: assistantResponse.message.content,
        };
        await FirestoreService.createDocument(
          collectionPath,
          documentId,
          gptResponse,
          "gptResponse",
        );
      } else {
        setError("Assistant response not found");
      }
    } catch (error) {
      setError("Error communicating with the server");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>ChatGPT</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <input type="text" value={message} onChange={handleChange} />
        </label>
        <button type="submit">Send</button>
      </form>
      {error && <div>Error: {error}</div>}
      <div>
        <h2>Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default GPT;
