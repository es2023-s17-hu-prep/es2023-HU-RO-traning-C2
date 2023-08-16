import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDineEaseContext } from "./context/DineEaseContext";
import FinishOrder from "./pages/FinishOrder";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantPage from "./pages/RestaurantPage";

/**
 * App entrypoint
 */
const App = () => {
  const { user } = useDineEaseContext();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        {/* Private routes */}
        <Route path="/" element={user ? <Index /> : <Navigate to="/login" />} />
        <Route
          path="/restaurant/:id"
          element={user ? <RestaurantPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/finish"
          element={user ? <FinishOrder /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
