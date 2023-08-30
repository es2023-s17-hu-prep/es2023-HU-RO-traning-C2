import {Button} from "../buttons/Button";
import {ReactComponent as PlusIcon} from "../icons/plus.svg";
import * as PropTypes from "prop-types";

/**
 * Menu item react component
 * @param onClick
 * @param data
 * @param variant
 * @returns {JSX.Element}
 * @constructor
 */
export function MenuItem({onClick, data, variant}) {
    return <div className="bg-white rounded-md border shadow-xl px-4 py-2 flex items-center justify-between w-full">
        <span className="font-semibold">{data.name}</span>

        <div className="flex gap-4 items-center">
            <span className="text-purple-500 font-bold">{data.price.toFixed(2)} EUR</span>
            <Button onClick={onClick} variant="secondary">
                <PlusIcon className={`stroke-purple-500 ${variant === 'add' ? '' : 'rotate-45'}`}/>
            </Button>
        </div>
    </div>
}

MenuItem.propTypes = {onClick: PropTypes.func, data: PropTypes.any};