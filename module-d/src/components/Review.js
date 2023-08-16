import React from "react";
import Rating from "./Rating";

/**
 * Represents a review card
 */
const Review = ({ review }) => {
  return (
    <div className="border border-slate-300 rounded-md shadow-sm p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{review.reviewer}</h2>
        <Rating rating={review.rating} />
      </div>

      <div className="w-full h-[1px] bg-slate-300" />

      <p>{review.comment}</p>
    </div>
  );
};

export default Review;
