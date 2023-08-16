import React from "react";

/**
 * Reuseable button component
 */
const Button = ({ children, ...rest }) => {
  return (
    <button
      className="bg-purple-normal w-full rounded-full flex items-center justify-center px-6 py-2 text-white hover:bg-purple-dark transition-all"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
