import React from 'react';
import DOGGO from '../images/CORGI.jpg';
import './css/404.css';
const NotFound = () => {
    return (
        <div className="color">
            <h3> 404: NOT FOUND</h3>
            <p className="bigger-text">but here's a cute picture of a corgi :)</p>
            <img src={DOGGO} className="picture-resize"/>
        </div>
    );
}

export default NotFound