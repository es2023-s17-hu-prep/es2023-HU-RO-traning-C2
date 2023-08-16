import React from "react";
import star from "../assets/star.png";

/**
 * Displays the stars based on the rating
 */
const Rating = ({ rating }) => {
  rating = Math.round(rating);

  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <img src={star} key={i} alt="Star" />
      ))}

      {Array.from({ length: 5 - rating }).map((_, i) => (
        <img src={star} key={5 + i} alt="Star" className="grayscale" />
      ))}
    </div>
  );
};

export default Rating;
