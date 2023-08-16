import {NavLink, useParams} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {useOrder} from "../../hooks/useOrder";
import {BaseLayout} from "../../layout/BaseLayout";
import {Header} from "../../layout/Header";
import {MenuItem} from "../../components/MenuItem";
import {ReactComponent as OrderIllustration} from "../../components/illustrations/order.svg";
import {Button} from "../../components/Button";
import axios from "axios";
import {useState} from "react";
import {OrderFinished} from "./OrderFinished";

/**
 * Page for completing the order
 * @returns {JSX.Element}
 * @constructor
 */
export function OrderPage() {
    const {id} = useParams();
    const {header} = useAuth();
    const {removeItem, order, total, clearOrder} = useOrder();
    const [finished, setFinished] = useState(false);

    // Handle the order
    async function handleOrder() {
        // Group by id, calculate the quantity
        const items = {};
        for (let row of order) {
            if (!(row.id in items)) {
                items[row.id] = 0;
            }
            items[row.id]++;
        }

        // Send request
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/restaurant/${id}/order`, {
                items: Object.entries(items).map(([menuItemId, quantity]) => ({menuItemId, quantity}))
            }, {headers: {Authorization: header}})
        } catch (e) {
            console.log(e)
        }

        // Finish the order
        clearOrder()
        setFinished(true)
    }

    return <BaseLayout>
        <Header/>
        <div className="flex flex-col gap-12 mx-auto max-w-7xl w-full px-4 pt-6">
            <h1 className="text-4xl font-bold">Finish Order</h1>

            <div className="flex gap-16 min-h-screen">
                {finished ? (
                    <OrderFinished/>
                ) : (
                    <div className="flex flex-col w-full gap-4">
                        <h2 className="font-bold text-xl mb-4">Your Items</h2>
                        {order.map((item, idx) => <MenuItem key={idx} {...item} icon="remove"
                                                            onClick={() => removeItem(idx)}/>)}
                        <span className="text-3xl mt-4 font-medium">Total: {total} EUR</span>

                        <div className="flex gap-4">
                            <NavLink to={`/restaurants/${id}`}>
                                <Button variant="secondary">Go Back</Button>
                            </NavLink>
                            <Button onClick={handleOrder} variant="primary">Finish Order</Button>
                        </div>
                    </div>
                )}
                <OrderIllustration className="flex-shrink-0"/>
            </div>

        </div>
    </BaseLayout>;
}