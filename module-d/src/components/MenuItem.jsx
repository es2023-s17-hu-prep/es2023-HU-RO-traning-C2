import {Button} from "./Button";

import {ReactComponent as AddIcon} from "./icons/add.svg";

/**
 * React component to display a menu item
 * @param name
 * @param price
 * @param onClick
 * @param icon
 * @returns {JSX.Element}
 * @constructor
 */
export function MenuItem({name, price, onClick, icon}) {
    return <div className="flex p-2 shadow-md justify-between items-center">
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="flex gap-4 items-center">
            <span className="text-purple-600 font-bold">{price} EUR</span>
            <Button variant="secondary" onClick={onClick}>
                {icon === "add" ? <AddIcon className="stroke-purple-500" /> : <AddIcon className="stroke-purple-500 rotate-45" />}
            </Button>
        </div>
    </div>
}