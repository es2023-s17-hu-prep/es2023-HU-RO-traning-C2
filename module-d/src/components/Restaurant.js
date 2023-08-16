import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/restaurant.webp";
import { useDineEaseContext } from "../context/DineEaseContext";
import Rating from "./Rating";

/**
 * Represents a restaurant card
 */
const Restaurant = ({ restaurant }) => {
  const { setCurrentRestaurantId } = useDineEaseContext();

  return (
    <div
      className={`p-4 flex flex-col gap-2 bg-white shadow-lg border rounded-md ${
        restaurant.visited ? "border-purple-normal" : "border-slate-200"
      }`}
    >
      <img
        src={image}
        className="max-w-full rounded-md shadow-md object-cover h-32"
      />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{restaurant.name}</h2>
        <Rating rating={restaurant.averageRating} />
      </div>

      <p className="text-slate-800 font-sm">{restaurant.description}</p>

      <Link
        className="text-purple-normal font-semibold hover:underline ml-auto"
        to={`/restaurant/${restaurant.id}`}
        onClick={() => setCurrentRestaurantId(restaurant.id)}
      >
        Continue »
      </Link>
    </div>
  );
};

export default Restaurant;
