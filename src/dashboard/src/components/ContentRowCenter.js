import React from 'react';
import LastMovieInDb from './LastMovieInDb';
import GenresInDb from './GenresInDb';
import { useEffect, useState } from "react";

function ContentRowCenter(){

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

    useEffect(() => {
        fetch('http://localhost:3001/api/categories')
            .then ( respo => respo.json())
            .then ( category => {
                setCategorias(category)
                
            })
            .catch (err => console.log(err));
    }, []);
    
    useEffect(() => {
    }, [categorias]);

    useEffect(()=> console.log('Se desmontó el componente'),[]);

    let TotalCategorias = {
        name: categorias.name,
        quantity: categorias.count
    }

    let TotalUsuario = {
        imagen: usuarios.imagen,
        nombre: usuarios.nombre,
        correo: usuarios.correo,
        perfil: usuarios.detail,
    }

    let tarjeta = [TotalCategorias, TotalUsuario]

    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastMovieInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <GenresInDb />

        </div>
    )
}

export default ContentRowCenter;