import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => (
  <nav className="col-md-2 d-none d-md-block bg-light sidebar">
    <div className="sidebar-sticky">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to={'/dashboard'} className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={'/users'} className="nav-link active">
            Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={'/roles'} className="nav-link active">
            Roles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={'/products'} className="nav-link active">
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={'/orders'} className="nav-link active">
            Order
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Menu;
