import {useEffect, useState} from "react";
import {ReactComponent as StarIcon} from "./icons/star.svg";

/**
 * React component for displaying a star rating input
 * @param readOnly
 * @param value
 * @param onChange
 * @returns {JSX.Element}
 * @constructor
 */
export function Rating({readOnly, value, onChange}) {
    const [hovered, setHovered] = useState(value - 1);

    useEffect(() => {
        setHovered(value - 1)
    }, [value]);

    const stars = Array.from({length: 5})
    return <div className="inline-flex gap-1" onMouseLeave={() => setHovered(value-1)}>
        {stars.map((_, idx) => <StarIcon
            onMouseEnter={() => !readOnly && setHovered(idx)}
            onClick={() => !readOnly && onChange(hovered+1)}
            className={hovered >= idx ? "fill-yellow-500" : "fill-gray-400"} key={idx}
        />)}
    </div>
}