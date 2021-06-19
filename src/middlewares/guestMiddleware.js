// Middlewares destinado a que si alguien esta logueado NO me permita ingresar a la vista del REGISTER y LOGIN.

function guestMiddleware (req, res, next) {
    if(req.session.userLogged){
        return res.redirect("/user/profile")
    };
    next();
};

module.exports = guestMiddleware;