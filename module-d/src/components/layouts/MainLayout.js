import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

/**
 * Layout for the other pages
 */
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 min-h-screen overflow-x-hidden">
      <Nav />
      <main className="w-full flex flex-col flex-1 px-16 gap-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
