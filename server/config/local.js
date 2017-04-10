'use strict';

module.exports = {
    env: 'local',
    port: 3001,
    mongodb: {
        uri: process.env.DEV_MONGO_URI,
        debug: true
    }
}