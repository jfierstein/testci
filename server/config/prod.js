'use strict';

module.exports = {
    env: 'prod',
    port: 3000,
    mongodb: {
        uri: process.env.MONGO_URI,
        debug: true
    },
    docker: {
        url: process.env.DOCKER_API_URL || 'https://registry.hub.docker.com/v1/'
    }
}
