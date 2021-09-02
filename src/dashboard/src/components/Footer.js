import React from 'react';
import logo from "../assets/images/logo.png"
import './Footer.css'

function Footer(){
    return (
        <React.Fragment>
            <footer>
                <div className="iconos-footer">
                    <i class="fab fa-instagram"></i>
                    <i class="fab facebook fa-facebook-f"></i>
                    <i class="fab fa-twitter"></i>
                </div>
                <div class="logo-footer">
                    <img class="logo-f" src={logo} alt="All Meet"/>
                </div>
                <div className="derechos">
                    Allmeet 2021. Todos los derechos reservados
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer;