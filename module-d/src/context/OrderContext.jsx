import {createContext} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";

/**
 * Context for storing the order
 * @type {React.Context<{addItem: addItem, removeItem: removeItem, order: *[]}>}
 */
export const OrderContext = createContext({order: [], addItem: () => {}, removeItem: () => {} })

/**
 * Order context provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function OrderContextProvider({children}){
    const [orderJson, setOrderJson] = useLocalStorage('order', '[]');
    const order = JSON.parse(orderJson);

    function handleAddItem(item) {
        setOrderJson(JSON.stringify([...order, item]))
    }

    function handleRemoveItem(id) {
        setOrderJson(JSON.stringify(order.filter((_, idx) => idx !== id)))
    }

    function handleClearOrder(){
        setOrderJson("[]")
    }

    return <OrderContext.Provider value={{order: order, addItem: handleAddItem, removeItem: handleRemoveItem, clearOrder: handleClearOrder}}>
        {children}
    </OrderContext.Provider>
}