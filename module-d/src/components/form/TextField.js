import * as PropTypes from "prop-types";

/**
 * Text field react component
 * @param props
 * @constructor
 */
export function TextField({value, onChange, type, startIcon, placeholder}) {
    return <div className="relative w-full">
        <div className="absolute top-1/2 left-3 -translate-y-1/2">{startIcon}</div>
        <input className={`py-3 pr-4 border rounded-xl bg-gray-200 w-full h-full ${startIcon ? 'pl-12' : 'pl-4'}`} type={type} value={value}
               placeholder={placeholder} onChange={e => onChange(e.target.value)}/>
    </div>
}

TextField.propTypes = {
    onChange: PropTypes.func,
    startIcon: PropTypes.element,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string
};