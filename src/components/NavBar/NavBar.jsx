import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import "./NavBar.css";
import logo from "../../assets/logo.png";




function NavBar() {

    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("userId");
        setAuth({ token: null })
    }
    
    console.log(auth)

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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
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
                            {auth.token ? (
                                <div>
                                    <Link to="#">Hi, {auth.username}</Link>
                                    <Link to="/" onClick={handleLogout}>Log Out</Link>
                                </div>
                            ) : (
                                <div>
                                    <Link to="/login">Log In</Link> 
                                    <Link to="/users">Sign up</Link>
                                </div>
                            )}
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
                            <Link to="/projects">Create fundraiser</Link>
                        </li>
                        <li>
                        {auth.token ? (
                            <div>
                                <Link to="#">Hi, {auth.username}</Link>
                                <Link to="/" onClick={handleLogout}>Log Out</Link>
                            </div>
                            ) : (
                                <div>
                                    <Link to="/login">Log In</Link> 
                                    <Link to="/users">Sign up</Link>
                                </div>
                            )}
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