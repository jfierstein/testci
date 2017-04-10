'use strict';

module.exports = {
    env: 'prod',
    port: 3000,
    mongodb: {
        uri: process.env.MONGO_URI,
        debug: true
    }
}
