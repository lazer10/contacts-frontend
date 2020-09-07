import React from 'react'
import { NavLink } from "react-router-dom";

const NavBar=()=> {
    return (
<nav className="navbar navbar-expand-sm bg-dark navbar-dark">

<ul className="navbar-nav text-light mx-auto">
  <li className="nav-item">
    <NavLink exact activeClassName="active" className="nav-link" to="/">Home</NavLink>
  </li>
  <li className="nav-item">
    <NavLink exact activeClassName="active" className="nav-link" to="/my-contacts">My Contacts</NavLink>
  </li>
  <li className="nav-item">
    <NavLink exact activeClassName="active" className="nav-link" to="/add-contact">Add Contacts</NavLink>
  </li>
</ul>

</nav>
    )
}

export default NavBar;