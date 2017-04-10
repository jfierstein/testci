'use strict';

module.exports = {
    env: 'prod',
    port: 3000,
    mongodb: {
        uri: process.env.DEV_MONGO_URI,
        debug: true
    }
}
