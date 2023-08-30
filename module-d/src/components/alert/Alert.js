import * as PropTypes from "prop-types";

/**
 * Error alert component
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function Alert({children}) {
    return <div className="py-3 px-5 rounded-xl border-red-700 text-red-700 bg-red-300 font-semibold">
        {children}
    </div>
}

Alert.propTypes = {children: PropTypes.node};