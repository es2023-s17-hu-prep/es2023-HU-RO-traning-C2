import {NavLink} from "react-router-dom";
import {Button} from "../../components/Button";

/**
 * Component for displaying the finished order message
 * @returns {JSX.Element}
 * @constructor
 */
export function OrderFinished() {
    return <div className="w-full flex flex-col gap-2">
        <h2 className="font-bold text-xl mb-4">Order finished</h2>
        <NavLink to="/search">
            <Button variant="secondary">Back to search</Button>
        </NavLink>
    </div>;
}