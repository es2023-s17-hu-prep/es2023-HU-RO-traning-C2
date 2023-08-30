import React from "react";
import authImage from "../assets/auth-image.svg";
import logo from "../assets/Logo.png";

/**
 * Layout for the Auth Routes
 */
const AuthLayout = ({ children, title }) => {
  return (
    <div className="w-full h-screen overflow-hidden flex items-start gap-16 p-8">
      <div className="w-1/2 flex flex-col">
        <div>
          <img src={logo} alt="Logo" />
        </div>

        <div className="px-4 pt-16 h-full flex-1 flex flex-col gap-3">
          {children}
        </div>
      </div>
      <div className="gap-4 h-full w-1/2 rounded-lg bg-primary-darker text-white flex flex-col items-center justify-center text-3xl font-semibold">
        <img src={authImage} alt="Auth" />
        {title}
      </div>
    </div>
  );
};

export default AuthLayout;
