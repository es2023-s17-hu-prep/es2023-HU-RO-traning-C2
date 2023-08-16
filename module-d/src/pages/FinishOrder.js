import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/kicsikocsi.png";
import Button from "../components/Button";
import ButtonSecondary from "../components/ButtonSecondary";
import MainLayout from "../components/layouts/MainLayout";
import MenuItem from "../components/MenuItem";
import SuccessOrderPopup from "../components/SuccessOrderPopup";
import { useDineEaseContext } from "../context/DineEaseContext";

/**
 * Finish order page
 */
const FinishOrder = () => {
  const { menuItems, user, currentRestaurantId, setMenuItems } =
    useDineEaseContext();
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const navigate = useNavigate();

  /**
   * If the user has no items in their cart, navigate them back
   */
  useEffect(() => {
    if (menuItems.lenght < 1) navigate("/");
  }, []);

  /**
   * Calculate the total final price
   */
  const total = menuItems.reduce((acc, c) => acc + c.price, 0);

  /**
   * Submitting the order placing
   */
  const placeOrder = () => {
    axios
      .post(
        `/restaurant/${currentRestaurantId}/order`,
        { items: menuItems.map((x) => ({ menuItemId: x.id, quantity: 1 })) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then(() => {
        setSuccessPopupOpen(true);
        setMenuItems([]);
      });
  };

  return (
    <>
      <SuccessOrderPopup
        isOpen={successPopupOpen}
        onClose={() => setSuccessPopupOpen(false)}
        onAction={() => navigate(`/`)}
      />

      <MainLayout>
        <h1 className="text-[64px] font-bold mx-16">Finish Order</h1>

        {/* Items in the cart */}
        <div className="flex items-start gap-32 mx-16">
          <div className="flex flex-col gap-2 flex-1 my-auto">
            <h3 className="text-xl font-bold text-slate-800">Your Items</h3>
            {menuItems.map((i) => (
              <MenuItem toRemove={true} menuItem={i} key={i.id} />
            ))}
          </div>

          <img src={img} alt="Finish Order Image" />
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-5 mx-16">
          <div className="text-3xl font-semibold">Total: {total} EUR</div>
          <div className="flex items-center gap-2 justify-start">
            <div>
              <ButtonSecondary
                onClick={() => navigate(`/restaurant/${currentRestaurantId}`)}
              >
                Go Back
              </ButtonSecondary>
            </div>

            <div>
              <Button onClick={placeOrder}>Finish Order</Button>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default FinishOrder;
