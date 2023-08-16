import React from "react";
import { useDineEaseContext } from "../context/DineEaseContext";
import ButtonSecondary from "./ButtonSecondary";

/**
 * Represents a menuItem in a menu list.
 */
const MenuItem = ({ menuItem, toRemove = false }) => {
  const { setMenuItems } = useDineEaseContext();

  return (
    <div className="w-full p-2 rounded-md shadow-sm border border-slate-100 flex items-center gap-4">
      <div>{menuItem.name}</div>

      <div className="text-purple-normal font-bold ml-auto">
        {menuItem.price} EUR
      </div>

      <div>
        <ButtonSecondary
          onClick={() => {
            toRemove
              ? setMenuItems((prev) => prev.filter((x) => x.id !== menuItem.id))
              : setMenuItems((prev) => [...prev, menuItem]);
          }}
        >
          {toRemove ? <>&times;</> : <>+</>}
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default MenuItem;
