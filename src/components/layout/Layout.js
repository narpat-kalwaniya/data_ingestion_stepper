import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";

const Layout = ({ user }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100">
        <Navbar user={user} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
