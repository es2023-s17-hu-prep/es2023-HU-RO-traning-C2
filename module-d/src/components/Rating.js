import React from "react";
import star from "../assets/star.png";

/**
 * Component for displaying the stars based on the rating.
 */
const Rating = ({ rating }) => {
  rating = Math.round(rating);
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: rating }).map((_, i) => (
        <img src={star} alt="Star" key={i} />
      ))}

      {Array.from({ length: 5 - rating }).map((_, i) => (
        <img src={star} alt="Star" className="grayscale" key={i} />
      ))}
    </div>
  );
};

export default Rating;
