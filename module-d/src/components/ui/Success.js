import React from "react";

/**
 * Component for displaying success.
 */
const Success = ({ children }) => {
  return (
    <div className="px-4 py-2 text-center rounded-md border border-green-500 bg-green-500/10 text-green-800">
      {children}
    </div>
  );
};

export default Success;
