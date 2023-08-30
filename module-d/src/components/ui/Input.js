import React from "react";

/**
 * Reuseable input component
 */
const Input = ({ icon, ...rest }) => {
  return (
    <div className="relative">
      <input
        className="bg-input pr-3 pl-10 py-2 text-black w-full rounded-md focus:outline-primary-dark"
        {...rest}
      />
      <div className="absolute top-1/2 -translate-y-1/2 p-2">{icon}</div>
    </div>
  );
};

export default Input;
