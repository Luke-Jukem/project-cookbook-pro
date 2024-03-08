import { collection, query, onSnapshot } from "firebase/firestore";
import { firestoreDb } from "../firebaseConfig.js";

/**
 * needs a collection name and useState setter
 * returns an unsubscribe method to stop listening
 * @param {ReactUseStateFunction} setter
 * @param {String} collectionName
 * @returns {Unsubscribe}
 */
function getSavedRecipesListener(setter, userId) {
  const collectionName = `Users/${userId}/SavedRecipes`;
  var q = query(collection(firestoreDb, collectionName));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const recipes = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().id != 0) {
        recipes.push(doc.data());
      }
    });
    setter(recipes);
  });
  return unsubscribe;
}

export default getSavedRecipesListener;
