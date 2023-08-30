import React from "react";
import { useDineEaseContext } from "../../context/DineEaseContext";
import ButtonSecondary from "../ui/ButtonSecondary";

/**
 * Displays a list of the menu items
 */
const MenuList = ({ action = "add", menuItems, title }) => {
  const { setMenuItems } = useDineEaseContext();

  return (
    <div className="flex flex-col gap-3 w-full">
      <h2 className="text-2xl text-slate-800 font-bold">{title}</h2>

      {menuItems.length < 1 && <div>No items found</div>}

      {menuItems.map((i, idx) => (
        <div
          key={idx}
          className="w-full border border-slate-200 shadow-md flex items-center gap-2 px-4 py-2 rounded-md"
        >
          <div>{i.name}</div>
          <div className="ml-auto font-bold text-primary-dark">
            {i.price} EUR
          </div>

          {action === "add" ? (
            <ButtonSecondary
              fullWidth={false}
              onClick={() =>
                setMenuItems((prev) => [...prev, { ...i, itemId: Date.now() }])
              }
            >
              +
            </ButtonSecondary>
          ) : (
            <ButtonSecondary
              fullWidth={false}
              onClick={() =>
                setMenuItems((prev) =>
                  prev.filter((x) => x.itemId !== (i.itemId ?? i.id))
                )
              }
            >
              &times;
            </ButtonSecondary>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuList;
