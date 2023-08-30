import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDineEaseContext } from "./context/DineEaseContext";
import FinishPage from "./pages/FinishPage";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RestaurantPage from "./pages/RestaurantPage";

/**
 * Application entrypoint
 */
const App = () => {
  const { token } = useDineEaseContext();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <RegisterPage />}
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={token ? <Index /> : <Navigate to="/login" />}
        />
        <Route
          path="/restaurant/:id"
          element={token ? <RestaurantPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/finish"
          element={token ? <FinishPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
