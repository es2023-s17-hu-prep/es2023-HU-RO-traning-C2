import {useContext} from "react";
import {OrderContext} from "../context/OrderContext";

/**
 * Hook for managing orders
 */
export function useOrder(){
    const context = useContext(OrderContext);

    if(!context) throw new Error("The useOrder hook can only be used inside the OrderContextProvider")

    return {...context, total: context.items.reduce((sum, item) => sum+item.price, 0)};
}