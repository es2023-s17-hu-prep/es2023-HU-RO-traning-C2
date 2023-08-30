import {ReactComponent as StarIcon} from "../icons/star.svg";
import * as PropTypes from "prop-types";

/**
 * Rating star react component
 * @param active
 * @param onHover
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
export function RatingItem({active, onHover, onClick}) {
    return <StarIcon className={active ? 'fill-yellow-500' : 'fill-gray-500'} onClick={onClick} onMouseEnter={onHover}/>
}

RatingItem.propTypes = {
    active: PropTypes.bool,
    onHover: PropTypes.func,
    onClick: PropTypes.func
};
