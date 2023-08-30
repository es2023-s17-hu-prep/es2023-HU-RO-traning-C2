import React from "react";

/**
 * Component for displaying errors.
 */
const Alert = ({ children }) => {
  return (
    <div className="px-4 py-2 text-center rounded-md border border-red-500 bg-red-500/10 text-red-800">
      {children}
    </div>
  );
};

export default Alert;
