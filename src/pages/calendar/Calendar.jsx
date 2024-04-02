import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import MealForm from "./components/MealForm.jsx";
import "../../css/calendarStyle.css";
import "react-calendar/dist/Calendar.css";
import FirestoreService from "../../firebase/FirebaseService.js";
import FirestoreListener from "../../firebase/FirestoreListener.js";
import { useAuth } from "../../utils/AuthContext.js";

const MyCalendar = () => {
  //firebase auth
  const { user } = useAuth();
  //state variables, initial value of date and selectedDay are both current date
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  //empty array of plans
  const [plans, setPlans] = useState([]);
  //modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  //for displaying saved plans from firebase
  const firestoreListener = new FirestoreListener();

  useEffect(() => {
    const userPlansPath = `Users/${user.uid}/Plans`;

    const unsubscribeFromPlans = firestoreListener.subscribeToCollection(
      userPlansPath,
      (docs) => {
        const plans = docs;
        setPlans(plans);
      },
    );

    return unsubscribeFromPlans;
  }, [user.uid]);

  //onChange and onClickDay update date and selectedDay
  const onChange = (date) => {
    setDate(date);
  };
  const onClickDay = (date) => {
    setSelectedDay(date);
  };

  //adding a plan
  const addPlan = (name, id, autoAddToCart, addToCartTime) => {
    const newPlan = {
      date: selectedDay.toISOString().split("T")[0],
      meals: [
        {
          name: name,
          id: id,
          autoAddToCart: autoAddToCart,
          addToCartTime: addToCartTime,
        },
      ],
    };
    setPlans([...plans, newPlan]);

    const planId = selectedDay.toISOString().split("T")[0];
    const userPlansPath = `Users/${user.uid}/Plans/`;
    FirestoreService.createDocument(userPlansPath, planId, newPlan, "plan")
      .then(() => console.log("Plan saved successfully"))
      .catch((error) => console.error("Error saving plan: ", error));
  };

  //opening/closing modal (meal form)
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
                <h6>{meal.name}</h6>
              </div>
            )),
          )}
      </div>
    </div>
  );
};

export default MyCalendar;
