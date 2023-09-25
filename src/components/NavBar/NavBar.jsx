import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import Footer from "../Footer/footer";




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

    const closeMenu = () => {
        setMenuOpen(false);
    }


    return (
        <div className="main-container">
            <header>
                <div className="mobile-nav-left">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 search-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                    <Link to="/" className="logo"><img src={logo} alt="logo"/></Link> 
                    <div className="mobile-nav-right">
                        <HamburgerButton isOpen={menuOpen} onClick={toggleMenu} />
                    </div>
                    <nav className={`mobile-nav ${menuOpen ? "" : "hidden"}`}>
                    <ul>
                        <li>
                            <Link to="/" onClick={closeMenu}>Home</Link>
                        </li>
                        <li>
                            <a onClick={closeMenu}>About</a>
                        </li>
                        <li>
                            <Link to="/projects" onClick={closeMenu}>Create fundraiser</Link>
                        </li>
                        <li>
                        {auth.token ? (
                            <div>
                                <Link to="#" onClick={closeMenu}>Hi, {auth.username}</Link>
                                <Link to="/" onClick={handleLogout}>Log Out</Link>
                            </div>
                            ) : (
                                <div>
                                    <Link to="/login" onClick={closeMenu}>Log In</Link> 
                                    <Link to="/users" onClick={closeMenu}>Sign up</Link>
                                </div>
                            )}
                        </li>

                    </ul>
                </nav>
                <nav className={`desktop-nav ${menuOpen ? "hidden" : ""}`}>
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
            </header>
            <Outlet />
            <Footer />
        </div>
    );
}

export default NavBar;