const db = require("../database/models");

function adminMiddleware(req, res, next) {
    
    res.locals.admin = false;
    if (req.session.userLogged) {
        if(req.session.userLogged.admin == 1){
            res.locals.admin = true;
        }
}
	next();
}

module.exports = adminMiddleware;