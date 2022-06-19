import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./header.scss";

export const Header = () => {
  return (
    <div>
      <header className="header">
        <h1>React app</h1>

        <ul className="menu">
          <li>
            {" "}
            <NavLink
              to="/styled"
              className={({ isActive }) => (isActive ? "red" : "blue")}
            >
              styled components
            </NavLink>
          </li>
          <li>
            <Link to="/invoices">routing</Link>
          </li>
          <li>
            {" "}
            <Link to="/tests">tests</Link>
          </li>
          <li>y</li>
          <li>z</li>
        </ul>
        <Outlet />
      </header>
    </div>
  );
};
