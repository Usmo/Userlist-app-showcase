import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/addUser" exact>
          ADD USER
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
