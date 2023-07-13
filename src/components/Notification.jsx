import React, { useEffect, useState } from 'react'
import './Notification.css';

const Notification = ({message, isVisible, setIsVisible}) => {
    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`notification ${isVisible ? 'visible' : ''}`}>
            {message}
        </div>
    )
}

export default Notification