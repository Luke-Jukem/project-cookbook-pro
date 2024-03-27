import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/search/Search";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Health from "./pages/health/Health";
import CreateRecipe from "./pages/create-recipe/CreateRecipe";
import Recommendations from "./pages/Recommendations";
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
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/health" element={<Health />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
