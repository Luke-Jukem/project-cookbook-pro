import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { firestoreDb } from "./firebaseConfig.js";

async function deleteRecipe(collection, recipeID) {
  deleteDoc(doc(firestoreDb, collection, recipeID));
}

export default deleteRecipe;
