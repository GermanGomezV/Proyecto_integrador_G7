import React from 'react';
import PropTypes from 'prop-types';

function LastMovieInDb(props){
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo usuario registrado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={props.imagen} alt="Profile Imagen"/>
                    </div>
                    <p>{props.nombre} - {props.correo}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href={props.detail}>Ver Perfil</a>
                </div>
            </div>
        </div>
    )
}

/* DEFINICIÓN DE PROPIEDADES POR DEFAULT */

LastMovieInDb.defaultProps = {
    imagen: 'No Picture',
    nombre: 'No Name',
    correo: 'No email',
    detail: 'No detail'
}

/* PROPTYPES */

LastMovieInDb.propTypes = {
    atritutes: PropTypes.shape({
        imagen: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        correo: PropTypes.string.isRequired,
        detail: PropTypes.string.isRequired
    })
}

export default LastMovieInDb;
