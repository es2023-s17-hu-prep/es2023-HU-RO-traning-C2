import React from "react";

/**
 * Component to display simple alerts.
 */
const Alert = ({ children }) => {
  return (
    <div className="bg-red-500/10 text-red-800 px-4 py-2 rounded-lg text-center">
      {children}
    </div>
  );
};

export default Alert;
