// Middlewares destinado a que si alguien NO está logueado NO me permita ingresar a la vista del PROFILE.
// Este middleware en nuestro proyecto no tiene sentido hasta el momento porque no tenemos una vista de PROFILE

function authMiddleware (req, res, next) {
    if(!req.session.userLogged){
        return res.redirect("/users/login")
    };
    next();
};

module.exports = authMiddleware;