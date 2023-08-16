import React from "react";

/**
 * Reuseable button component
 */
const ButtonSecondary = ({ children, ...rest }) => {
  return (
    <button
      className="whitespace-nowrap hover:shadow-md flex items-center gap-2 font-semibold bg-purple-light w-full rounded-full justify-center px-6 py-2 text-purple-dark transition-all"
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
