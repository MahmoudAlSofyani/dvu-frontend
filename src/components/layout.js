import React from "react";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div className="container h-screen">
      <div>
        <Header />
      </div>
      <div className="my-5">{children}</div>
    </div>
  );
};

export default Layout;
