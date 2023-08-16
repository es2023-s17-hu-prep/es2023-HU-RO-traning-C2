import {useOrder} from "../../hooks/useOrder";
import {Link} from "react-router-dom";
import {Button} from "../../components/Button";

/**
 * Component for displaying the summary of the order
 * @param restaurantId
 * @returns {JSX.Element}
 * @constructor
 */
export function OrderSummary({restaurantId}) {
    const {total} = useOrder();
    return <Link to={`/restaurants/${restaurantId}/order`}>
        <Button variant="secondary">
            Finish order ({total.toFixed(2)} EUR)
        </Button>
    </Link>
}