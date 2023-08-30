import React from "react";
import restaurantImg from "../assets/restaurant.webp";
import { Link } from "react-router-dom";
import Rating from "./Rating";

/**
 * A card for displaying a restaurant.
 */
const Restaurant = ({ restaurant }) => {
  return (
    <div
      className={`rounded-md shadow-md p-4 flex flex-col gap-4 border ${
        restaurant.visited ? "border-primary-dark" : "border-slate-200"
      }`}
    >
      <img
        src={restaurantImg}
        alt="Restaurant"
        className="rounded-md shadow-sm h-48 object-cover object-center"
      />

      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">{restaurant.name}</span>
        <Rating rating={restaurant.averageRating} />
      </div>

      <p className="text-slate-800">{restaurant.description}</p>

      <Link
        to={`/restaurant/${restaurant.id}`}
        className="text-primary-dark font-semibold ml-auto hover:underline"
      >
        Continue »
      </Link>
    </div>
  );
};

export default Restaurant;
