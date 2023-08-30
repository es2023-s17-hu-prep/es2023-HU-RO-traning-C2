import * as PropTypes from "prop-types";

/**
 * Rounded button react component
 * @param type
 * @param variant
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function RoundedButton({type, variant, children}) {
    const color = variant === 'primary' ?
        'transition bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white'
            :
        'bg-purple-100 hover:bg-purple-200 active:bg-purple-300 text-purple-500';
    return <button className={`p-3 rounded-full font-semibold ${color}`} type={type}>
        {children}
    </button>
}

RoundedButton.propTypes = {
    variant: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.node
};