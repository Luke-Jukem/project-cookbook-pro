import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/search/SearchPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Header from "./components/header/Header";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";
import "./css/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import RecommendationsPage from "./pages/recommendations/RecommendationsPage";
import CreateRecipesPage from "./pages/create-recipe/CreateRecipesPage";
import HealthPage from "./pages/health/HealthPage";
import OrderHistoryPage from "./pages/order-history/OrderHistoryPage";

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
            <Route path="/search" element={<SearchPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/create-recipe" element={<CreateRecipesPage />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
