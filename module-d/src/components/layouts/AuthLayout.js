import React from "react";
import image from "../../assets/hero-emberke.png";

/**
 * Layout for the auth routes
 */
const AuthLayout = ({ title, children }) => {
  return (
    <div className="h-screen w-screen p-8 flex items-stretch justify-center gap-8">
      {/* Main */}
      <div className="flex-1 flex flex-col gap-8 my-auto w-1/2 ml-8">
        {children}
      </div>

      {/* Left purple box */}
      <div className="bg-purple-dark rounded-lg flex flex-col gap-8 items-center justify-center w-1/2">
        <img src={image} alt="Image" className="mt-auto" />
        <h1 className="text-3xl font-semibold text-white flex-1 mb-auto">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default AuthLayout;
