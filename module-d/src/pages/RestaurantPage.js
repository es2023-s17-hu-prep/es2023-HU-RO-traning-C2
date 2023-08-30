import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useParams } from "react-router-dom";
import restaurantImage from "../assets/restaurant.webp";
import axios from "axios";
import { useDineEaseContext } from "../context/DineEaseContext";
import Rating from "../components/Rating";
import MenuList from "../components/restaurant/MenuList";
import Reviews from "../components/restaurant/Reviews";

/**
 * Page for displaying a restaurant
 */
const RestaurantPage = () => {
  const { token, setCurrentRestaurantId } = useDineEaseContext();

  /**
   * Get the ID from the params
   */
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState();

  /**
   * Fetch the restaurant on page load
   */
  useEffect(() => {
    setCurrentRestaurantId(id);

    axios
      .get(`/restaurant/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRestaurant(res.data));
  }, [id, token, setCurrentRestaurantId]);

  if (!restaurant) return null;

  return (
    <MainLayout>
      <img
        src={restaurantImage}
        className="absolute w-full top-0 left-0 right-0 h-72 object-cover object-center z-[-1]"
        alt="Restaurant"
      />

      <main className="px-32 flex flex-col gap-3">
        <h1 className="text-[3rem] font-bold pt-52">{restaurant.name}</h1>
        <div className="flex items-center gap-2">
          {restaurant.averageRating}{" "}
          <Rating rating={restaurant.averageRating} />
        </div>
        <div className="max-w-[600px] text-slate-800">
          {restaurant.description}
        </div>

        <div className="flex items-start gap-8">
          <MenuList
            title="Menu"
            action="add"
            menuItems={restaurant.menuItems}
          />
          <Reviews reviews={restaurant.ratings} restaurantId={restaurant.id} />
        </div>
      </main>
    </MainLayout>
  );
};

export default RestaurantPage;
