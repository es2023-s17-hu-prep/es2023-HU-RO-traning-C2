import {Background} from "./Background";

/**
 * Base layout
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function BaseLayout({children, hideBg=false}) {
    return <div className="flex flex-col w-full pb-20 relative min-h-screen">
        {!hideBg && <Background />}
        {children}

        <footer className="w-full bg-black text-gray-300 text-xs p-2 text-center mt-6 absolute bottom-0 left-0 right-0">
            (c) 2023 - All rights reserved
        </footer>
    </div>
}