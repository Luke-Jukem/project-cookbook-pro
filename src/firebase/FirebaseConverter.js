import { GoalForm } from "../customObjects/GoalForm";

class FirebaseConverter {
  constructor() {
    this.objectConverter = {
      toFirestore: (object) => {
        if (!object) {
          console.error("Object is undefined or null");
          return null;
        }

        const properties = Object.keys(object);
        const convertedObject = {};

        properties.forEach((property) => {
          convertedObject[property] = object[property];
        });

        return convertedObject;
      },
      fromFirestore: (snapshot, objectClass, options) => {
        const data = snapshot.data(options);
        return new objectClass(...Object.values(data));
      },
    };

    this.convertArray = (array, converter) => {
      return array.map((item) => converter.toFirestore(item));
    };

    this.recipeConverter = {
      toFirestore: (recipe) => {
        if (!recipe) {
          console.error("Recipe is undefined or null");
          return null;
        }

        const convertedIngredients = this.convertArray(
          recipe.ingredients,
          this.objectConverter
        );

        return {
          cuisine: recipe.cuisine,
          dishType: recipe.dishType,
          id: recipe.id,
          image: recipe.image,
          ingredients: convertedIngredients,
          instructions: recipe.instructions,
          name: recipe.name,
          servings: recipe.servings,
          summary: recipe.summary,
          isSaved: recipe.isSaved,
        };
      },
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        const convertedIngredients = this.convertArray(
          data.ingredients,
          this.objectConverter
        );

        return new Recipe(
          data.cuisine,
          data.dishType,
          data.id,
          data.image,
          convertedIngredients,
          data.instructions,
          data.name,
          data.servings,
          data.summary,
          data.isSaved
        );
      },
    };

    this.orderConverter = {
      toFirestore: (order) => {
        if (!order) {
          console.error("Order is undefined or null");
          return null;
        }

        const convertedIngredients = this.convertArray(
          order.ingredients,
          this.objectConverter
        );

        return {
          recipeNames: order.recipeNames,
          ingredients: convertedIngredients,
        };
      },
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        const convertedIngredients = this.convertArray(
          data.ingredients,
          this.objectConverter
        );

        return {
          recipeNames: data.recipeNames,
          ingredients: convertedIngredients,
        };
      },
    };

    this.gptResponseConverter = {
      toFirestore: (gptResponse) => {
        if (!gptResponse) {
          console.error("GPT response is undefined or null");
          return null;
        }

        return {
          userMessage: gptResponse.userMessage,
          assistantResponse: gptResponse.assistantResponse,
        };
      },
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
          userMessage: data.userMessage,
          assistantResponse: data.assistantResponse,
        };
      },
    };

    this.goalsResponseConverter = {
      toFirestore: (goalsResponse) => {
        if (!goalsResponse) {
          console.error("Goal response is undefined or null");
          return null;
        }

        return {
          calories: goalsResponse.calories,
          protein: goalsResponse.protein,
          carbs: goalsResponse.carbs,
          fat: goalsResponse.fat,
          sugar: goalsResponse.sugar,
        };
      },
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new GoalForm(
          data.calories,
          data.protein,
          data.carbs,
          data.fat,
          data.sugar
        );
      },
    };
  }
}

export default FirebaseConverter;
