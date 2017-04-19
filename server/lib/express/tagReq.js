'use strict';
var os = require('os');
var ifaces = os.networkInterfaces();
let ip = null;
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) ip = 'none';
        if (alias >= 1) ip = iface.address;
        else ip = iface.address;
        ++alias;
    });
});

module.exports = (req, res, next) => {
    res.set('Machine-Address', ip);
    next();
};