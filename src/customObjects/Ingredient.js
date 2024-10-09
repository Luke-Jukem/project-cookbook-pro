class Ingredient {
  constructor(id, name, image, nutrition) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.nutrition = nutrition;
    this.isSaved = false;

    // Extract specific nutritional information
    if (nutrition && nutrition.nutrients) {
      this.calories = this.getNutrientAmount("Calories");
      this.fiber = this.getNutrientAmount("Fiber");
      this.sugar = this.getNutrientAmount("Sugar");
      this.carbohydrates = this.getNutrientAmount("Carbohydrates");
      this.fat = this.getNutrientAmount("Fat");
      this.protein = this.getNutrientAmount("Protein");
      this.sodium = this.getNutrientAmount("Sodium");
    }

    if (nutrition && nutrition.weightPerServing) {
      this.servingWeight = nutrition.weightPerServing.amount;
      this.servingUnit = nutrition.weightPerServing.unit;
    }
  }

  getNutrientAmount(nutrientName) {
    const nutrient = this.nutrition.nutrients.find(
      (n) => n.name === nutrientName
    );
    return nutrient ? nutrient.amount : null;
  }

  toString() {
    return `${this.name} (ID: ${this.id})`;
  }
}

export { Ingredient };
