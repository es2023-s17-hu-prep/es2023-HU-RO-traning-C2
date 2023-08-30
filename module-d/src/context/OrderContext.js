import {createContext, useMemo} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import * as PropTypes from "prop-types";

/**
 * React context storing the order items
 * @type {React.Context<{addItem(item: Item), removeItem(index: number), items: Item[]}>}
 */
export const OrderContext = createContext({
    items: [], addItem() {}, removeItem() {}, clearCart(){}
})

/**
 * Context provider for the order context
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function OrderContextProvider({children}) {
    const [rawItems, setRawItems] = useLocalStorage('order', '[]');

    const items = useMemo(() => JSON.parse(rawItems), [rawItems]);

    function addItem(item) {
        setRawItems(JSON.stringify([...items, item]));
    }

    function removeItem(index) {
        setRawItems(JSON.stringify(items.filter((_, idx) => idx !== index)))
    }

    function clearCart(){
        setRawItems('[]');
    }

    return <OrderContext.Provider value={{items, addItem, removeItem, clearCart}}>
        {children}
    </OrderContext.Provider>
}

OrderContextProvider.propTypes = {children: PropTypes.node};