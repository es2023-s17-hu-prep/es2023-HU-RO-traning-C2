import React from "react";

/**
 * Reuseable button component
 */
const Button = ({
  children,
  fullWidth = true,
  className,
  rounded = false,
  ...rest
}) => {
  return (
    <button
      className={`px-4 py-2 bg-primary-dark text-white cursor-pointer hover:bg-primary-darker transition-all ${
        fullWidth ? "w-full" : "w-fit"
      } ${rounded ? "rounded-full" : "rounded-md"} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
