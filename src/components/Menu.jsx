import { NavLink, Outlet } from "react-router-dom";

import './Menu.css';

export default function Menu () {
    return(  
        <>
            <nav className="menu">
                <NavLink to="/" >
                Home
                </NavLink>
                <NavLink to="/login">
                Login
                </NavLink>
            </nav>
            <Outlet/>
        </>     
        
    )
}