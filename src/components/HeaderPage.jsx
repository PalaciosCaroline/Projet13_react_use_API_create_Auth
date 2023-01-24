import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './../assets/argentBankLogo.png'
import { FaUserCircle, FaSignInAlt } from 'react-icons/fa';

export default function HeaderPage() {
  return (
    <header>
        <nav className="main-nav">
           <Link to='/' className="main-nav-logo">
                <img src={Logo} className="main-nav-logo-image" alt="ArgentBank logo" />
                <h1 className="sr-only">Argent Bank</h1>
           </Link> 
           <div className='box_sign'>
                <Link className="main-nav-item" to="/login">
                <FaUserCircle />
                    <span>Sign In</span>
                </Link>
                <Link className="main-nav-item" to="/">
                  <FaSignInAlt />
                  <span>Sign Out</span>
                </Link>
            </div>
        </nav>
    </header>
  )
}
