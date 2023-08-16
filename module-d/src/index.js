import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import AuthContext from './context/auth';

import Home from "./routes/Home";
import Register from './routes/Register';
import Restaurant from './routes/Restaurant';
import Cart from './routes/Cart';
import Fallback from './routes/Fallback';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Fallback />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/restaurant/:id",
    element: <Restaurant />
  },
  {
    path: "/cart/:restaurantId",
    element: <Cart />
  },
  
]);

const App = () => {
  const [absoluteHeader, setAbsoluteHeader] = useState(false);

  return (
    <React.StrictMode>
      <AuthContext.Provider value={{
        token: localStorage.getItem("token"),
        user: localStorage.getItem("user")
      }}>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </AuthContext.Provider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
