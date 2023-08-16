/**
 * TextField component
 * @param variant
 * @param type
 * @returns {JSX.Element}
 */
export function TextField({value, onChange, icon, placeholder, type, fullWidth, ...rest}) {
    return <div className={`rounded-md bg-gray-100 flex items-center pl-2 border-box ${fullWidth ? "w-full" : ""}`}>
        {icon}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} {...rest}
                       className="bg-gray-100 p-2 text-gray-600 w-full"/>
    </div>
}