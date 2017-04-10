'use strict';

module.exports = {
    env: 'dev',
    port: 3001,
    mongodb: {
        uri: process.env.MONGO_URI,
        debug: true
    }
}
