import React from "react";
import Button from "./Button";

/**
 * Popup that pops up on success order
 */
const SuccessOrderPopup = ({ isOpen, onClose, onAction }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="z-10 absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="flex flex-col gap-3 w-96 z-10 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md border border-slate-200 rounded-md px-6 py-4">
        <h2 className="text-2xl font-bold text-center">Successful order!</h2>
        <p className="text-center text-slate-800">
          Your order has been sent successfully. 💕
        </p>

        <Button onClick={onAction}>Go Back</Button>
      </div>
    </>
  );
};

export default SuccessOrderPopup;
