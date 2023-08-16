import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import searchIconPurple from "../assets/Search Icon Purple.svg";
import searchIcon from "../assets/Search Icon.svg";
import ButtonSecondary from "../components/ButtonSecondary";
import Input from "../components/Input";
import MainLayout from "../components/layouts/MainLayout";
import Restaurant from "../components/Restaurant";
import { useDineEaseContext } from "../context/DineEaseContext";

/**
 * Index page
 */
const Index = () => {
  const { user, setCurrentRestaurantId, setMenuItems } = useDineEaseContext();
  const [restaurants, setRestaurants] = useState();

  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Fetch the restaurants on page load
   */
  useEffect(() => {
    setCurrentRestaurantId("");
    setMenuItems([]);

    axios
      .get("/search", { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => setRestaurants(res.data));
  }, []);

  /**
   * Gets the restaurants.
   * @returns
   */
  const shuffledRestaurants = useMemo(() => {
    if (!restaurants) return restaurants;
    if (showMore) return restaurants;

    const shuffledArray = restaurants.sort(() => 0.5 - Math.random()); // shuffles array
    return shuffledArray.slice(0, 6);
  }, [restaurants, showMore]);

  /**
   * Search functionality
   */
  const handleSearch = () => {
    axios
      .get(`/search?query=${searchTerm}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setRestaurants(res.data));
  };

  return (
    <MainLayout>
      {/* Search */}
      <div className="flex items-stretch gap-2 justify-center">
        <Input
          placeholder="Search for restaurants"
          leftIcon={<img src={searchIcon} alt="Search Icon" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <ButtonSecondary onClick={handleSearch}>
            <img src={searchIconPurple} alt="Search Icon" />
          </ButtonSecondary>
        </div>
      </div>

      {/* Restaurants */}
      <div className="grid grid-cols-3 gap-4">
        {shuffledRestaurants?.map((r, i) => (
          <Restaurant key={i} restaurant={r} />
        ))}
      </div>
      {restaurants?.length < 1 && (
        <div className="text-lg text-center">No restaurants found</div>
      )}

      {/* Show more button */}
      {!showMore && restaurants?.length > 5 && (
        <button
          to="/register"
          onClick={() => setShowMore(true)}
          className="text-purple-normal font-semibold hover:underline mt-8"
        >
          Show more results
        </button>
      )}
    </MainLayout>
  );
};

export default Index;
