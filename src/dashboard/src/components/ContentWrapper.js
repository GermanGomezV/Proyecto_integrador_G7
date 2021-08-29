import React from 'react';
import TopBar from './TopBar';
import ContentRowTop from './ContentRowTop';
import Footer from './Footer';
import { useEffect, useState } from "react";

function ContentWrapper(){

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/users')
            .then ( respo => respo.json())
            .then ( users => {
                setUsuarios(users)
                
            })
            .catch (err => console.log(err));
    }, []);

    useEffect(() => {
    }, [usuarios]);

    const [categorias, setCategorias] = useState([]);

    let TotalUsuario = {
        imagen: usuarios.imagen,
        nombre: usuarios.nombre,
    }
    
    return (
        <React.Fragment>
            {/*<!-- Content Wrapper -->*/}
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                    <TopBar/>
                    <ContentRowTop />
                    <Footer />
                </div>
            </div>    
        </React.Fragment>
    )
}
export default ContentWrapper;