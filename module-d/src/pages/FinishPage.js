import React from "react";
import MainLayout from "../layout/MainLayout";
import MenuList from "../components/restaurant/MenuList";
import { useDineEaseContext } from "../context/DineEaseContext";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import axios from "axios";
import finishImage from "../assets/g10.png";

/**
 * Finish order page
 */
const FinishPage = () => {
  const { menuItems, currentRestaurantId, token } = useDineEaseContext();
  const total = menuItems.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);
  const navigate = useNavigate();

  /**
   * Submits the order to the backend
   */
  function handleFinish() {
    axios
      .post(
        `/restaurant/${currentRestaurantId}/order`,
        menuItems.map((x) => ({ menuItemId: x.id.toString(), quantity: 1 })),
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => navigate("/?success=true"));
  }

  return (
    <MainLayout>
      <main className="px-32 flex flex-col gap-4 mb-6">
        <h1 className="font-bold text-[3rem]">Finish Order</h1>

        <div className="flex items-start gap-32">
          <MenuList action="remove" menuItems={menuItems} title="Your Items" />
          <img src={finishImage} alt="Finish" />
        </div>

        <h3 className="font-semi text-4xl mt-5">Total: {total} EUR</h3>

        <div className="flex items-center gap-2">
          <ButtonSecondary
            fullWidth={false}
            onClick={() => navigate(`/restaurant/${currentRestaurantId}`)}
          >
            Go Back
          </ButtonSecondary>

          <Button fullWidth={false} onClick={handleFinish}>
            Finish Order
          </Button>
        </div>
      </main>
    </MainLayout>
  );
};

export default FinishPage;
