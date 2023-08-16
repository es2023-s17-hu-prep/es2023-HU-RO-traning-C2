import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import DashboardPage from "./pages/dashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      var token = localStorage.getItem("token");
      if (token === undefined || token == null) {
        return null;
      }
      return redirect("/dashboard");
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: () => {
      var token = localStorage.getItem("token");
      if (token === undefined || token == null) {
        return null;
      }
      return redirect("/dashboard");
    },
  },
  {
    path: "/dashboard",
    loader: () => {
      var token = localStorage.getItem("token");
      if (token === undefined || token == null) {
        return redirect("/login");
      }

      return [];
    },
    element: <DashboardPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
