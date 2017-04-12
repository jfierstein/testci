'use strict';

module.exports = (req, res, next) => {
    if(process.env.NODE_ENV == "local") return next();
    if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https'))
        res.redirect('https://' + req.get('Host') + req.url);
    else return next();
}