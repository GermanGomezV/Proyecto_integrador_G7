import React from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Productos in DB --> */

let productosDB = {
    title: 'Productos',
    color: 'primary', 
    cuantity: 21,
    icon: 'fa-clipboard-list'
}

/* <!-- Total Categorias --> */

let categoriasDB = {
    title:'Categorias', 
    color:'success', 
    cuantity: '79',
    icon:'fa-award'
}

/* <!-- Usuarios quantity --> */

let usuariosDB = {
    title:'Usuarios' ,
    color:'warning',
    cuantity:'49',
    icon:'fa-user-check'
}

let cartProps = [productosDB, categoriasDB, usuariosDB];

function ContentRowMovies(){
    return (
    
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;