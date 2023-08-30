import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

/**
 * Create the context
 */
const DineEaseContext = createContext(null);

/**
 * Hook to use the context easily
 */
export function useDineEaseContext() {
  return useContext(DineEaseContext);
}

/**
 * Create the context provider
 */
export const ContextProvider = ({ children }) => {
  /**
   * Save in the local storage
   */
  const [token, setToken] = useLocalStorage("token", null);
  const [menuItems, setMenuItems] = useLocalStorage("menuItems", []);
  const [currentRestaurantId, setCurrentRestaurantId] = useLocalStorage(
    "currentRestaurant",
    null
  );

  return (
    <DineEaseContext.Provider
      value={{
        token,
        setToken,
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
