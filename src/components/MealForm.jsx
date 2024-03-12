import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../css/mealFormStyle.css";

const MealForm = ({ selectedDay, addPlan, closeModal }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [option, setOption] = useState(null);
  const [showText, setShowText] = useState("");

  const watchAddToCart = watch("autoAddToCart", false);

  const onSubmit = (data) => {
    addPlan(
      data.mealType,
      data.title,
      data.calories,
      data.mealId,
      data.autoAddToCart,
      data.addToCartTime,
    );
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="meal-form-container">
      <button type="button" onClick={closeModal} className="exit-button">
        X
      </button>
      {!option && (
        <div>
          <button
            type="button"
            className="option-button"
            onClick={() => setOption("Saved")}
            onMouseEnter={() => setShowText("Choose from your saved recipes.")}
            onMouseLeave={() => setShowText("")}
          >
            Saved
          </button>
          <button
            type="button"
            className="option-button"
            onClick={() => setOption("Recommended")}
            onMouseEnter={() => setShowText("Choose from recommended recipes.")}
            onMouseLeave={() => setShowText("")}
          >
            Recommended
          </button>
          <button
            type="button"
            className="option-button"
            onClick={() => setOption("Custom")}
            onMouseEnter={() => setShowText("Input a custom meal.")}
            onMouseLeave={() => setShowText("")}
          >
            Custom
          </button>
        </div>
      )}
      {showText && <p>{showText}</p>}
      {option === "Saved" && <p>Saved Meals</p>}
      {option === "Recommended" && <p>Recommended Meals</p>}
      {option === "Custom" && (
        <>
          <input type="hidden" value="Custom" {...register("mealType")} />
          <label>
            Title:
            <input type="text" {...register("title")} />
          </label>
          <label>
            Calories:
            <input type="text" {...register("calories")} />
          </label>
          <input type="hidden" value="N/A" {...register("mealId")} />
          <label>
            Add this to my cart!
            <input type="checkbox" {...register("autoAddToCart")} />
          </label>
          {watchAddToCart && (
            <label>
              Add To Cart Time:
              <input type="text" {...register("addToCartTime")} />
            </label>
          )}
          <input type="submit" value="Submit" />
          <br></br>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </>
      )}
    </form>
  );
};

export default MealForm;
