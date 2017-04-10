'use strict';

module.exports = {
    env: 'dev',
    port: 3001,
    mongodb: {
        uri: process.env.DEV_MONGO_URI,
        debug: true
    }
}
