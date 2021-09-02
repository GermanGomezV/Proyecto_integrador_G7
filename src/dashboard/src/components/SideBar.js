
import React from 'react';
import logo from '../assets/images/logo.png'
	
function SideBar () {
    return (    
        
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">
        
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="http://localhost:3001">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={logo} alt="All Meet"/>
                    </div>
                </a>

                <hr className="sidebar-divider my-0"/>

                <li className="nav-item active">
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>All Meet Dashboard</span></a>
                </li>

                <hr className="sidebar-divider"/>

                <div className="sidebar-heading">Actions</div>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="http://localhost:3001">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Home</span>
                    </a>
                </li>

                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
    )
}

export default SideBar