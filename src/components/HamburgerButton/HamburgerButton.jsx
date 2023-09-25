import React from 'react';
import './HamburgerButton.css';

function HamburgerButton({ isOpen, onClick }) {
    return (
        <div className={`hamburger-button ${isOpen ? 'change' : ''}`} onClick={onClick}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
    );
}

export default HamburgerButton;
