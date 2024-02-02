import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css"

const links = [
    {
        link: "/events",
        name: "Events",
    },
    {
        link: "/theme",
        name: "Theme",
    },
    {
        link: "/about-us",
        name: "About Us",
    },
];


const Nav = ()=>{
    return(
        <ul className="nav-links-container">
            {
                links.map((item,index)=>(
                    <li key={index} style={{listStyle:"none"}} className="nav-links">
                        {item.name}
                    </li>
                ))
            }
            
        </ul>
        
    )
}

export default Nav;