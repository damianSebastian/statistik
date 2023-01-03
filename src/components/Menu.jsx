import { NavLink, Outlet } from "react-router-dom";

import './Menu.css';

export default function Menu () {
    return(  
        <>
            <nav className="menu">
                <NavLink exact to="/" activeClassName="active">
                Home
                </NavLink>
                <NavLink to="/login" activeClassName="active">
                Login
                </NavLink>
                <NavLink to="/services" activeClassName="active">
                Services
                </NavLink>
                <NavLink to="/portfolio" activeClassName="active">
                Portfolio
                </NavLink>
                <NavLink to="/contact" activeClassName="active">
                Contact
                </NavLink>
                
                
            </nav>
            <Outlet/>
        </>     
        
    )
}