import * as PropTypes from "prop-types";

/**
 * Base Layout for the authenticated pages
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function BaseLayout({children}) {
    return <div className="w-screen h-screen flex flex-col relative">
        <div className="absolute blur-[130px] inset-0 -z-10">
            <div className="bg-purple-400 rounded-full right-0 top-0 w-[300px] h-[300px] absolute"></div>
        </div>
        <main className="pb-12 h-full overflow-y-auto overflow-x-hidden">
            {children}
        </main>
        <footer className="text-center bg-black text-gray-300 p-4">
            (c) 2023 - All rights reserved
        </footer>
    </div>
}

BaseLayout.propTypes = {children: PropTypes.node};