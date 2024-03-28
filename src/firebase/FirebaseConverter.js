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
          this.objectConverter,
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
          this.objectConverter,
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
          data.isSaved,
        );
      },
    };

    this.orderConverter = {
      toFirestore: (order) => {
        const convertedRecipes = order.recipes.map((recipe) => {
          return {
            name: recipe.name,
            ingredients: this.convertArray(
              recipe.ingredients,
              this.objectConverter,
            ),
          };
        });

        return {
          recipes: convertedRecipes,
        };
      },
    };
  }
}

export default FirebaseConverter;
