import React from "react";

/**
 * Reuseable input component
 */
const Input = ({ leftIcon, ...rest }) => {
  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute top-1/2 left-2 -translate-y-1/2">
          {leftIcon}
        </div>
      )}
      <input
        {...rest}
        className="w-full bg-slate-100 rounded-lg placeholder:slate-500 px-10 pr-5 py-1.5 outline-none focus:outline-2 focus:outline-purple-normal"
      />
    </div>
  );
};

export default Input;
