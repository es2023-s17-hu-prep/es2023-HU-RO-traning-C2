import React, { useCallback, useEffect, useMemo, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Input from "../components/ui/Input";
import search from "../assets/Search Icon.svg";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import axios from "axios";
import Restaurant from "../components/Restaurant";
import { useDineEaseContext } from "../context/DineEaseContext";
import { useSearchParams } from "react-router-dom";
import Success from "../components/ui/Success";

/**
 * Index page
 */
const Index = () => {
  const { token, setCurrentRestaurantId, setMenuItems } = useDineEaseContext();
  const [params] = useSearchParams();

  /**
   * Store the restaurants and the search word
   */
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showMore, setShowMore] = useState(false);

  /**
   * Searches for the restaurant and sets the state
   */
  const handleSearch = useCallback(
    (query) => {
      const url = `/search${query ? `?query=${query}` : ""}`;

      axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setRestaurants(res.data));
    },
    [token]
  );

  /**
   * Fetch the restaurants on page load
   */
  useEffect(() => {
    setCurrentRestaurantId(null);
    setMenuItems([]);
    handleSearch();
  }, [handleSearch, setMenuItems, setCurrentRestaurantId]);

  /**
   * Return the restaurants based on the showMore button
   */
  const restaurantsToDisplay = useMemo(
    () =>
      showMore
        ? restaurants
        : [...restaurants].sort(() => 0.5 - Math.random()).slice(0, 6),
    [showMore, restaurants]
  );

  return (
    <MainLayout>
      {params.get("success") && (
        <div className="w-96 mx-auto">
          <Success>Order successfully placed!</Success>
        </div>
      )}

      <form
        className="flex items-center gap-2 mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchTerm);
        }}
      >
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for restaurant"
          icon={<img src={search} alt="Search Icon" />}
        />
        <ButtonSecondary fullWidth={false}>
          <img src={search} alt="Search Icon" />
        </ButtonSecondary>
      </form>

      <main className="grid grid-cols-3 px-16 gap-6">
        {restaurants.length > 0
          ? restaurantsToDisplay.map((r) => (
              <Restaurant key={r.id} restaurant={r} />
            ))
          : "No results found."}
      </main>

      {!showMore && restaurants.length > 6 && (
        <button
          className="mx-auto text-primary-dark font-semibold hover:underline"
          onClick={() => setShowMore(true)}
        >
          Show more results
        </button>
      )}
    </MainLayout>
  );
};

export default Index;
