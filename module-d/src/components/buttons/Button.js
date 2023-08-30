import * as PropTypes from "prop-types";

export function Button({onClick, children, variant, startIcon, type}) {
    const color = variant === 'primary' ?
        'transition bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white'
        :
        'bg-purple-100 hover:bg-purple-200 active:bg-purple-300 text-purple-500';
    return <button className={`p-3 rounded-lg shadow font-semibold flex gap-2 ${color}`} onClick={onClick} type={type}>
        {startIcon} {children}
    </button>
}


Button.propTypes = {
    onClick: PropTypes.func,
    variant: PropTypes.string,
    type: PropTypes.string,
    startIcon: PropTypes.element,
    children: PropTypes.node
};