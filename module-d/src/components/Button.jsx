/**
 * Get the tailwind classes for the color of the button
 * @param variant
 * @returns {string}
 */
function getColorByVariant(variant) {
    switch (variant) {
        case 'primary':
            return 'bg-purple-500 text-white font-bold hover:bg-purple-600 active:bg-purple-700';
        case 'secondary':
            return 'bg-purple-200 text-purple-500 font-bold hover:bg-purple-300 active:bg-purple-400';
        case 'text':
            return 'text-purple-500 font-bold hover:bg-gray-100 active:bg-gray-200';
    }
}

/**
 * Get the tailwind classes for the shape of the button
 * @param type
 * @returns {string}
 */
function getStyleByType(type) {
    switch (type) {
        case 'default':
            return 'rounded-md shadow-md';
        case 'rounded':
            return 'rounded-full';
    }
}

/**
 * Button component
 * @param variant
 * @param type
 * @param children
 * @param icon
 * @param onClick
 * @param fullWidth
 * @returns {JSX.Element}
 */
export function Button({variant, type='default', children, icon, onClick, fullWidth}) {
    const color = getColorByVariant(variant)
    const style = getStyleByType(type)

    const className = `p-3 flex items-center justify-center gap-2 ${color} ${style} ${fullWidth ? 'w-full' : ''}`;

    return <button className={className} onClick={onClick}>{icon} {children}</button>
}