'use strict';

const http = require('lib/helpers/http');;
const awscfg = require('config/env').aws;
const AWS = require('aws-sdk');
const provide = {};

AWS.config.region = 'us-east-1';
//hi
provide.getRunningServices = () => {
    return new Promise(function (resolve, reject) {
        var ecs = new AWS.ECS();
        ecs.describeServices({ cluster: 'testci-dev-cluster', services: ['testci-dev'] }, function (err, data) {
            if (err) reject(err);
            else if (data.services.length) {
                //get the task definition of services[0]
                const serviceTaskDefArn = data.services[0].taskDefinition;
                ecs.describeTaskDefinition({taskDefinition: serviceTaskDefArn}, function (err, data) {
                    if (err) reject(err);
                    if (data.taskDefinition.containerDefinitions) {
                        const containerDef = data.taskDefinition.containerDefinitions[0];
                        const serviceInfo = {
                            taskDefinition: serviceTaskDefArn.split('\/'),
                            portMappings: containerDef.portMappings,
                            image: containerDef.image
                        }
                        resolve(serviceInfo);
                    }
                });
            }
            else resolve({});
        });
    });
};

module.exports = provide;