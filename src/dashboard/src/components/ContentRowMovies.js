import React from 'react';
import SmallCard from './SmallCard';
import { useEffect, useState } from "react";

/*  Cada set de datos es un objeto literal */

/* <!-- Productos in DB --> */

function ContentRowMovies(){
    
    const [productos, setProductos] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3001/api/products')
            .then ( res => res.json())
            .then ( data => {
                setProductos(data)
            })
            .catch (err => console.log(err));
    }, []);

    useEffect(() => {
    }, [productos]);
    
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
        fetch('http://localhost:3001/api/users')
            .then ( respo => respo.json())
            .then ( category => {
                setCategorias(category)
                
            })
            .catch (err => console.log(err));
    }, []);
    
    useEffect(() => {
    }, [categorias]);

    useEffect(()=> console.log('Se desmontó el componente'),[]);

    
    let TotalProductos = {
        title: 'Cantidad de productos',
        cuantity: productos.count
    }

    let TotalUsuarios = {
        title: 'Cantidad de usuarios',
        cuantity: usuarios.count
    }

    let TotalCategorias = {
        title: 'Cantidad de categorias',
        cuantity: categorias.count
    }

    let tarjeta = [TotalProductos, TotalUsuarios, TotalCategorias]

    return (
    
        <div className="row">
            
            {tarjeta.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;