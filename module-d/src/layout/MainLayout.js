import React from "react";
import logo from "../assets/Logo.png";
import logout from "../assets/logout.png";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import { useNavigate } from "react-router-dom";
import { useDineEaseContext } from "../context/DineEaseContext";

/**
 * Layout that wraps the logged in parts of the page.
 */
const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { setToken, menuItems } = useDineEaseContext();

  const total = menuItems.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);

  return (
    <div className="flex flex-col gap-8 overflow-x-hidden min-h-screen">
      <nav className="w-full px-8 py-4 flex gap-3 relative">
        <div className="w-56 h-56 rounded-full blur-3xl bg-primary-light z-[-1] absolute -top-1/2 right-[-100px]" />

        <img
          src={logo}
          alt="Logo"
          className="mr-auto cursor-pointer"
          onClick={() => navigate("/")}
        />

        {menuItems.length > 0 && window.location.pathname !== "/finish" && (
          <ButtonSecondary
            fullWidth={false}
            className="shadow-md"
            onClick={() => {
              navigate("/finish");
            }}
          >
            Finish Order ({total} EUR)
          </ButtonSecondary>
        )}

        <ButtonSecondary
          fullWidth={false}
          className="shadow-md"
          onClick={() => {
            setToken(null);
            navigate("/login");
          }}
        >
          <img src={logout} alt="Logout Icon" />
          Log Out
        </ButtonSecondary>
      </nav>

      {children}

      <footer className="w-full mt-auto bg-black text-center p-4 text-white">
        &copy; 2023 - All rights reserved
      </footer>
    </div>
  );
};

export default MainLayout;
