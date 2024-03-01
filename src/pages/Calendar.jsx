import React, { useState } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import MealForm from "../components/MealForm";
import "react-calendar/dist/Calendar.css";
import "../css/calendarStyle.css";

//rough calendar implementation
const MyCalendar = () => {
  //state variables, initial value of date and selectedDay are both current date
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  //empty array of plans
  const [plans, setPlans] = useState([]);
  //modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  //placeholder variables for later use
  const [formState, setFormState] = useState({
    mealType: "",
    title: "",
    calories: "",
    mealId: "",
    autoAddToCart: false,
    addToCartTime: "",
  });

  //onChange and onClickDay update date and selectedDay
  const onChange = (date) => {
    setDate(date);
  };
  const onClickDay = (date) => {
    setSelectedDay(date);
  };

  //adding a plan
  const addPlan = (
    mealType,
    title,
    calories,
    mealId,
    autoAddToCart,
    addToCartTime,
  ) => {
    const newPlan = {
      //this splits the string and discards the time
      date: selectedDay.toISOString().split("T")[0],
      meals: [
        {
          type: mealType,
          title: title,
          calories: calories,
          mealId: mealId,
          autoAddToCart: autoAddToCart,
          addToCartTime: addToCartTime,
        },
      ],
    };
    setPlans([...plans, newPlan]);
  };

  //opening/closing modal (meal form)
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //for later
  // const handleInputChange = (event) => {
  //   const target = event.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   const name = target.name;

  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   addPlan(
  //     formState.mealType,
  //     formState.title,
  //     formState.calories,
  //     formState.mealId,
  //     formState.autoAddToCart,
  //     formState.addToCartTime,
  //   );
  // };

  //adds a placeholder dummy meal until I create the form
  const handleAddMeal = () => {
    const dummyPlan = {
      date: selectedDay.toISOString().split("T")[0],
      meals: [
        {
          type: "Dummy Meal",
          title: "Dummy Title",
          calories: "Dummy Calories",
          mealId: "Dummy Meal ID",
          autoAddToCart: false,
          addToCartTime: "Dummy Time",
        },
      ],
    };
    setPlans([...plans, dummyPlan]);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={date}
        onClickDay={onClickDay}
        tileContent={({ date, view }) => {
          const dayPlans = plans.filter(
            (plan) => plan.date === date.toISOString().split("T")[0],
          );
          return (
            <div>
              <p>
                {dayPlans.length} {dayPlans.length === 1 ? "plan" : "plans"}
              </p>
              {dayPlans.map((plan) => (
                <div>{plan.title}</div>
              ))}
            </div>
          );
        }}
        //greying out past dates
        tileClassName={({ date, view }) => {
          //splits the strings and compares only the dates (so that current day isn't greyed)
          if (
            date.toISOString().split("T")[0] <
            new Date().toISOString().split("T")[0]
          ) {
            return "past-date";
          }
        }}
      />
      <div className="selected-day">
        <span className="date-display">
          {selectedDay.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>{" "}
        <br />
        <button className="add-meal-btn" onClick={openModal}>
          Add Meal
        </button>
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
          <MealForm closeModal={closeModal} addPlan={addPlan} />
        </Modal>
        <br />
        <br />
        {plans
          .filter(
            (plan) => plan.date === selectedDay.toISOString().split("T")[0],
          )
          .map((plan, index) =>
            plan.meals.map((meal, mealIndex) => (
              <div key={mealIndex} className="meal-tile">
                <h6>{meal.title}</h6>
                <p>{meal.calories} calories</p>
              </div>
            )),
          )}
      </div>
    </div>
  );
};

export default MyCalendar;
