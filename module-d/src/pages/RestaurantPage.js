import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img from "../assets/restaurant.webp";
import MainLayout from "../components/layouts/MainLayout";
import MenuItem from "../components/MenuItem";
import NewReview from "../components/NewReview";
import Rating from "../components/Rating";
import Review from "../components/Review";
import { useDineEaseContext } from "../context/DineEaseContext";

/**
 * Restaurant Detail Page
 */
const RestaurantPage = () => {
  const { id } = useParams();
  const { user, menuItems } = useDineEaseContext();
  const [restaurant, setRestaurant] = useState();

  /**
   * Fetch the restaurant on page load
   */
  useEffect(() => {
    axios
      .get(`/restaurant/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setRestaurant(res.data));
  }, []);

  if (!restaurant) return null;

  const menuItemsOutOfCart = restaurant.menuItems.filter(
    (x) => !menuItems.map((x) => x.id).includes(x.id)
  );

  return (
    <MainLayout>
      {/* Big image */}
      <img
        src={img}
        alt="Restaurant"
        className="absolute left-0 right-0 top-0 h-80 object-cover w-screen z-[-1]"
      />

      <div className="mt-72 flex flex-col gap-1">
        {/* Name and rating */}
        <h1 className="text-[3.5rem] font-bold">{restaurant.name}</h1>
        <div className="flex items-center gap-1">
          <span className="text-slate-900 font-semibold">
            {restaurant.averageRating}
          </span>
          <Rating rating={restaurant.averageRating} />
        </div>
        <p className="text-slate-800">{restaurant.description}</p>

        <div className="flex items-start gap-8 mt-2">
          {/* Menu items */}
          <div className="w-2/3 flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-800">Menu</h3>
            {menuItemsOutOfCart.length < 1 && (
              <div className="italic">No menu items found.</div>
            )}

            {menuItemsOutOfCart.map((i) => (
              <MenuItem menuItem={i} key={i.id} />
            ))}
          </div>

          {/* Reviews */}
          <div className="w-1/3 flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-800">Reviews</h3>
            {restaurant.ratings.length < 1 && (
              <div className="italic">No reviews found.</div>
            )}

            {restaurant.ratings.map((i, idx) => (
              <Review review={i} key={idx} />
            ))}

            {/* New Review card */}
            <NewReview
              id={restaurant.id}
              onCreate={(r) =>
                setRestaurant((prev) => ({
                  ...prev,
                  ratings: [...prev.ratings, r],
                }))
              }
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RestaurantPage;
