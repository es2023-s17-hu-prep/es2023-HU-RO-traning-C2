import {useContext, useMemo} from "react";
import {OrderContext} from "../context/OrderContext";

/**
 * Hook for managing orders
 * @returns {{addItem: function(), removeItem: function(), order: []}}
 */
export function useOrder() {
    const context = useContext(OrderContext);

    if (!context) throw new Error("useOrder can only be used inside the OrderContextProvider")

    const total = useMemo(() => context.order.reduce((sum, item) => sum + item.price, 0), [context.order]);

    return {...context, total}
}