import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

/**
 * Create the context
 */
const DineEaseContext = createContext(null);

/**
 * Hook to easily access the context
 */
export const useDineEaseContext = () => {
  return useContext(DineEaseContext);
};

/**
 * ContextProvider
 */
export const ContextProvider = ({ children }) => {
  /**
   * Store the token
   */
  const [user, setUser] = useLocalStorage("user", null);

  /**
   * Store the menu items
   */
  const [menuItems, setMenuItems] = useLocalStorage("menuItems", []);

  /**
   * Store the current restaurant id
   */
  const [currentRestaurantId, setCurrentRestaurantId] = useLocalStorage(
    "currentRestaurantId",
    ""
  );

  return (
    <DineEaseContext.Provider
      value={{
        user,
        setUser,
        menuItems,
        setMenuItems,
        currentRestaurantId,
        setCurrentRestaurantId,
      }}
    >
      {children}
    </DineEaseContext.Provider>
  );
};
