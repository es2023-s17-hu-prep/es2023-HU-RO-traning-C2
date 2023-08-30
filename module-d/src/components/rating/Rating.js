import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {RatingItem} from "./RatingItem";

/**
 * Rating react component
 * @param readOnly
 * @param value
 * @param onChange
 * @returns {JSX.Element}
 * @constructor
 */
export function Rating({readOnly, value, onChange}) {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value)
    }, [value]);

    const items = Array.from({length: 5})

    return <div className="flex gap-2" onMouseLeave={() => setCurrentValue(value)}>
        {
            items.map((_, idx) => <RatingItem onHover={() => !readOnly && setCurrentValue(idx + 1)}
                                              onClick={() => !readOnly && onChange(currentValue)}
                                              active={idx < currentValue} key={idx}/>)
        }
    </div>
}

Rating.propTypes = {
    readOnly: PropTypes.bool,
    value: PropTypes.number,
    onChange: PropTypes.func
};