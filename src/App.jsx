import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home.jsx"
import Search from "./pages/search/Search";
import Calendar from "./pages/calendar/Calendar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Header from "./components/header/Header";
import Recomendations from "./pages/recommendations/Recommendations";
import CreateRecipes from "./pages/create-recipe/CreateRecipes";
import OrderHistory from "./pages/order-history/OrderHistory";
import MainLayout from "./pages/MainLayout";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";
import "./css/styles.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route
              path="/"
              element={
                <MainLayout>
                  <Search />
                </MainLayout>
              }
            />
              <Route
              path="/home"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />
            <Route
              path="/recommendations"
              element={
                <MainLayout>
                  <Recomendations />
                </MainLayout>
              }
            />
            <Route
              path="/create-recipe"
              element={
                <MainLayout>
                  <CreateRecipes />
                </MainLayout>
              }
            />
            <Route
              path="/order-history"
              element={
                <MainLayout>
                  <OrderHistory />
                </MainLayout>
              }
            />
            <Route
              path="/calendar"
              element={
                <MainLayout>
                  <Calendar />
                </MainLayout>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
