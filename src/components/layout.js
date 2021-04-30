import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import Header from "./header";

const Layout = ({ children }) => {
  const isMenuOpen = useStoreState((state) => state.mobileSideBar.isMenuOpen);

  return (
    <div className="container h-screen">
      <div>
        <Header />
      </div>
      <div className="my-5">
        {children}
      </div>
    </div>
  );
};

export default Layout;
