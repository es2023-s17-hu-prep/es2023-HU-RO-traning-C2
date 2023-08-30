import React from "react";
import star from "../assets/star.png";

const RatingSelect = ({ value, onChange }) => {
  value = Math.round(value);
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: value }).map((_, i) => (
        <img
          src={star}
          alt="Star"
          key={i}
          onClick={() => onChange(i + 1)}
          className="cursor-pointer"
        />
      ))}

      {Array.from({ length: 5 - value }).map((_, i) => (
        <img
          src={star}
          key={5 + i}
          alt="Star"
          onClick={() => onChange(value + i + 1)}
          className="grayscale cursor-pointer"
        />
      ))}
    </div>
  );
};

export default RatingSelect;
