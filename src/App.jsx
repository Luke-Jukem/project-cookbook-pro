import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/search/Search";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Header from "./components/header/Header";
import Recomendations from "./pages/recommendations/Recommendations";
import CreateRecipes from "./pages/create-recipe/CreateRecipes";
import Health from "./pages/health/Health";
import OrderHistory from "./pages/order-history/OrderHistory";
import MainLayout from "./pages/MainLayout";
import MobileLayout from "./pages/MobileLayout"; // Import your MobileLayout component
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";
import { isMobile } from "react-device-detect"; // Import isMobile from react-device-detect
import "./css/styles.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  // Determine which layout to use based on whether the device is mobile or not
  const Layout = isMobile ? MobileLayout : MainLayout;

  if (isMobile) {
    console.log("MobileLayout is being rendered.");
  }

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
                <Layout>
                  <Home />
                </Layout>
              }
            />
            {!isMobile && (
              <>
                <Route
                  path="/search"
                  element={
                    <Layout>
                      <Search />
                    </Layout>
                  }
                />
                <Route
                  path="/recommendations"
                  element={
                    <Layout>
                      <Recomendations />
                    </Layout>
                  }
                />
                <Route
                  path="/health"
                  element={
                    <Layout>
                      <Health />
                    </Layout>
                  }
                />
                <Route
                  path="/create-recipe"
                  element={
                    <Layout>
                      <CreateRecipes />
                    </Layout>
                  }
                />
                <Route
                  path="/order-history"
                  element={
                    <Layout>
                      <OrderHistory />
                    </Layout>
                  }
                />
              </>
            )}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
