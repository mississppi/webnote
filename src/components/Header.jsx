import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons'
import './Header.css';

const Header = ({logout, isDarkMode, handleModeToggle }) => {
    return (
        <div className="app-main-header">
            <span className="icon" onClick={handleModeToggle}>
                { isDarkMode ? (
                    <FontAwesomeIcon icon={faMoon} size="xl"/>
                    ) : (
                    <FontAwesomeIcon icon={faSun} size="xl"/>
                    )
                }
            </span>
        <button onClick={logout}>Logout</button>
    </div>
    )
}

export default Header