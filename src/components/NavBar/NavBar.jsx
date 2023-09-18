import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/logo.png";




function NavBar() {

    const [menuOpen, setMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    return (
        <div>
            <header>
                {/* <div id="mobile-header"> */}
                    <a href="" className="logo">
                        <img src={logo} alt="logo" />
                    </a>
                    <button onClick={toggleMenu} className="hamburger-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </button>
                {/* </div> */}
                <nav className="desktop-nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <Link to="/projects">Create fundraiser</Link>
                        </li>
                        <li>
                            <Link to="/login">Log In</Link>
                        </li>
                    </ul>
                </nav>

                <nav className="mobile-nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <a>Create fundraiser</a>
                        </li>
                        <li>
                            <Link to="/login">Log In</Link>
                        </li>

                    </ul>
                </nav>
                {/* <nav>
                    <Link to="/">Home</Link>
                    <Link to="/login">Log In</Link>
                </nav> */}
            </header>
            <Outlet />
        </div>
    );
}

export default NavBar;