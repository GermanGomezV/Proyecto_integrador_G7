const db = require("../database/models");

function adminMiddleware(req, res, next) {
    
    if (req.session.userLogged && req.session.userLogged.admin === 1 ) {
        next();
    }else{
        return res.redirect('/')
    }
}

module.exports = adminMiddleware;