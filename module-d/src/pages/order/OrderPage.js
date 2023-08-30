import {useOrder} from "../../hooks/useOrder";
import {BaseLayout} from "../../layout/BaseLayout";
import {Header} from "../../layout/Header";
import {MenuItem} from "../../components/menu/MenuItem";
import {Link, NavLink, useParams} from "react-router-dom";
import {Button} from "../../components/buttons/Button";
import axios from "axios";
import {useAuth} from "../../hooks/useAuth";
import {useState} from "react";
import {OrderIllustration} from "../../components/illustrations/OrderIllustration";
import {RoundedButton} from "../../components/buttons/RoundedButton";

/**
 * React component for displaying the order summary
 * @returns {null}
 * @constructor
 */
export function OrderPage() {
    const {items, total, removeItem, clearCart} = useOrder();
    const {id} = useParams();
    const {headers} = useAuth();
    const restaurantUrl = `/restaurants/${id}`;
    const [showDialog, setShowDialog] = useState(false);

    // Event handler for the finish order event
    async function finishOrder() {
        // Group items by id and count quantities
        const groups = {};
        for (let item of items) {
            if (!(item.id in groups)) groups[item.id] = 1;
            groups[item.id]++
        }

        // Send order
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/restaurant/${id}/order`, {
                items: Object.entries(groups).map(([menuItemId, quantity]) => ({
                    menuItemId,
                    quantity
                }))
            },
            {headers}
        )

        // User feedback
        clearCart()
        setShowDialog(true)
    }

    return <BaseLayout>
        <Header/>
        {
            showDialog && <div className="absolute inset-0 z-40 backdrop-blur"></div>
        }
        {
            showDialog && <div className="rounded-lg z-50 w-full max-w-lg p-12 flex flex-col items-center gap-8 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white shadow-2xl">
                <h1 className="font-bold text-4xl text-center">
                    Order placed successfully!
                </h1>
                <OrderIllustration/>
                <Link to="/" className="mt-12">
                    <RoundedButton variant="primary">
                        Back to search
                    </RoundedButton>
                </Link>
            </div>
        }

        <div className="flex flex-row gap-2 justify-between h-full">
            <div className="flex flex-col gap-16 w-full max-w-7xl pt-24 p-4">
                <h1 className="font-bold text-6xl">Finish Order</h1>

                <div className="flex flex-col gap-3">
                    <h2 className="font-bold text-2xl">Your items</h2>
                    {items.map((item, idx) => <MenuItem key={idx} data={item} onClick={() => removeItem(idx)}
                                                        variant='remove'/>)}
                </div>

                <span className="text-4xl">Total: {total.toFixed(2)} EUR</span>
                <div className="flex flex-row gap-4">
                    <NavLink to={restaurantUrl}>
                        <Button variant="secondary">
                            Go Back
                        </Button>
                    </NavLink>
                    <Button variant="primary" onClick={finishOrder}>
                        Finish Order
                    </Button>
                </div>
            </div>
            <div className="pr-8 my-auto">
                <OrderIllustration/>
            </div>
        </div>
    </BaseLayout>
}