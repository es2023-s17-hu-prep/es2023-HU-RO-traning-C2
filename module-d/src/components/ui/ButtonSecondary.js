import React from "react";

/**
 * Reuseable button component
 */
const ButtonSecondary = ({
  children,
  fullWidth = true,
  className,
  rounded = false,
  ...rest
}) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 font-semibold px-4 py-2 rounded-full bg-primary-lighter text-primary-dark cursor-pointer transition-all ${
        fullWidth ? "w-full" : "w-fit"
      } ${rounded ? "rounded-full" : "rounded-md"} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
