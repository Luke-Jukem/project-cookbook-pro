import { doc, setDoc } from "firebase/firestore";
import { firestoreDb } from "./firebaseConfig.js";
import FirebaseConverter from "../utils/FirebaseConverter.js";

const fb = new FirebaseConverter();
const recipeConverter = fb.recipeConverter;
const ingredientsConverter = fb.ingredientsConverter;

/**
 * @param {String} collection the collection to save into
 * @param {Recipe} recipe the recipe/meal you want to save
 */
async function PutRecipe(collection, recipe) {
  const convertIngredient = (ingredient) => {
    try {
      return ingredientsConverter.toFirestore(ingredient);
    } catch (error) {
      console.error("Error converting ingredient:", error);
      console.log("Problematic ingredient:", ingredient);
      throw error;
    }
  };

  try {
    const convertedIngredients = recipe.ingredients.map((ingredient) =>
      convertIngredient(ingredient),
    );

    const recipeWithConvertedIngredients = {
      ...recipe,
      ingredients: convertedIngredients,
    };

    const ref = doc(firestoreDb, collection, String(recipe.id)).withConverter(
      recipeConverter,
    );

    await setDoc(ref, recipeWithConvertedIngredients);
  } catch (error) {
    console.error("Error storing recipe:", error);
    throw error;
  }
}

export default PutRecipe;
