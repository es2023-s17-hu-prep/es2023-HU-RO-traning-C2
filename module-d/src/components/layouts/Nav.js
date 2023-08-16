import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import logout from "../../assets/logout.png";
import { useDineEaseContext } from "../../context/DineEaseContext";
import ButtonSecondary from "../ButtonSecondary";

/**
 * Navbar component
 */
const Nav = () => {
  const navigate = useNavigate();
  const { setUser, menuItems, setMenuItems, setCurrentRestaurantId } =
    useDineEaseContext();

  /**
   * Calculate the total final price
   */
  const total = menuItems.reduce((acc, c) => acc + c.price, 0);

  return (
    <nav className="w-full px-8 py-3 flex items-center gap-2 relative">
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="cursor-pointer"
        onClick={() => {
          navigate("/");
          setCurrentRestaurantId("");
        }}
      />

      {/* Buttons */}
      <div className="ml-auto flex gap-2">
        {menuItems.length > 0 && window.location.pathname !== "/finish" && (
          <ButtonSecondary onClick={() => navigate("/finish")}>
            Finish Order ({total} EUR)
          </ButtonSecondary>
        )}

        <ButtonSecondary
          onClick={() => {
            setUser(null);
            setMenuItems([]);
            navigate("/login");
          }}
        >
          <img src={logout} alt="Logout" />
          Log out
        </ButtonSecondary>
      </div>

      <div className="bg-purple-normal/40 w-64 h-64 blur-3xl absolute -top-8 -right-8 z-[-1]" />
    </nav>
  );
};

export default Nav;
