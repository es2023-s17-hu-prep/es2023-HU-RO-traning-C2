/**
 * Component for displaying a blurry background
 * @returns {JSX.Element}
 * @constructor
 */
export function Background() {
    return <div className="blur-3xl absolute inset-0 overflow-hidden -z-10">
        <div className="w-[400px] h-[400px] bg-purple-400 opacity-60 rounded-full absolute -right-16 -top-16"></div>
    </div>;
}