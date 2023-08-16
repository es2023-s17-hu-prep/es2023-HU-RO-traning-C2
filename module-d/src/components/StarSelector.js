import React from "react";
import star from "../assets/star.png";

/**
 * Component with the ability to select stars
 */
const StarSelector = ({ stars, onChange }) => {
  stars = Math.round(stars);

  return (
    <div className="flex gap-1">
      {Array.from({ length: stars }).map((_, i) => (
        <img
          src={star}
          key={i}
          alt="Star"
          className="cursor-pointer"
          onClick={() => onChange(i + 1)}
        />
      ))}

      {Array.from({ length: 5 - stars }).map((_, i) => (
        <img
          src={star}
          key={5 + i}
          alt="Star"
          onClick={() => onChange(5 - i + 1)}
          className="grayscale cursor-pointer"
        />
      ))}
    </div>
  );
};

export default StarSelector;
