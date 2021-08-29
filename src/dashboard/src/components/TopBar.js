import React from 'react';
import PropTypes from 'prop-types';

function TopBar(props){
    return(
        <React.Fragment>
				{/*<!-- Topbar -->*/}
				<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

					{/*<!-- Sidebar Toggle (Topbar) -->*/}
					<button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
						<i className="fa fa-bars"></i>
					</button>

					{/*<!-- Topbar Navbar -->*/}
					<ul className="navbar-nav ml-auto">

						<div className="topbar-divider d-none d-sm-block"></div>

						{/*<!-- Nav Item - User Information -->*/}
						<li className="nav-item dropdown no-arrow">
							<a className="nav-link dropdown-toggle" href="/" id="userDropdown">
								<span className="mr-2 d-none d-lg-inline text-gray-600 small">{props.nombre}</span>
								<img className="img-profile rounded-circle" src={props.imagen} alt="Profile" width="60"/>
							</a>
						</li>

					</ul>

				</nav>
				{/*<!-- End of Topbar -->*/}

        </React.Fragment>
    )
}

/* DEFINICIÓN DE PROPIEDADES POR DEFAULT */

TopBar.defaultProps = {
    nombre: 'No Name',
    imagen: 'No imagen',
}

/* PROPTYPES */

TopBar.propTypes = {
    atritutes: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        imagen: PropTypes.string.isRequired
    })
}

export default TopBar;