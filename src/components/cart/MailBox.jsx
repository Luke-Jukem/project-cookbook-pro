import { useEffect, useRef } from "react";
import {
  firebaseFunctions,
  httpsCallable,
} from "../../firebase/firebaseConfig";
import { useAuth } from "../../utils/AuthContext";

const MailBox = ({ orderData }) => {
  const { user } = useAuth();
  const formattedEmailBody = formatOrderDataToMarkdown(orderData);
  const emailSent = useRef(false); // Track if the email has been sent

  const sendMail = async () => {
    const userEmail = user?.email || null;
    const emailData = {
      to: userEmail,
      from: "cookbookpro.cis3296@gmail.com",
      subject: "Your Shopping List from Cookbook-Pro",
      text: formattedEmailBody,
    };

    const sendMailFunction = httpsCallable(firebaseFunctions, "sendMail");
    try {
      const result = await sendMailFunction(emailData);
      emailSent.current = true; // Mark email as sent
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  const currentOrderData = useRef(null);

  useEffect(() => {
    if (orderData !== currentOrderData.current && !emailSent.current) {
      sendMail();
      currentOrderData.current = orderData;
    }
  }, [orderData]);

  return null; // You can return null since this component doesn't render anything visible
};

// Function to format order data into Markdown
const formatOrderDataToMarkdown = (orderData) => {
  if (!orderData) return "";

  const { recipeNames, ingredients } = orderData;

  // Format recipe names as a Markdown list
  const formattedRecipeNames = recipeNames
    .map((recipe) => `- ${recipe}`)
    .join("\n");

  // Format ingredients as Markdown table rows
  const formattedIngredients = ingredients
    .map((ingredient) => {
      const unit = ingredient.unit.trim() || "serving";
      return `- [   ] ${ingredient.amount} ${unit} of ${ingredient.name}`;
    })
    .join("\n");

  // Combine formatted data into Markdown format
  const markdownBody = `
Recipes from your cart:
${formattedRecipeNames}

Ingredient Checklist for Recipes:
${formattedIngredients}
`;

  return markdownBody;
};

export default MailBox;
