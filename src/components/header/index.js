import React from 'react'
import { Link } from 'react-router-dom'
import '../../style/css/home.css'
import logo from '../../style/image/logo.png';

const Header = () => (
        <div className="header">
            <img src={logo} alt="Logo" height={100} width={200}/>
            <div className="header-right">
                <a className="active" href="/">Home</a>
                <a href="/contact">Contact Us</a>
                <a href="#" onClick={() => {sessionStorage.removeItem('token'); window.location = '/login'}}>Logout</a>    
            </div>
        </div>            
        
);

export default Header;