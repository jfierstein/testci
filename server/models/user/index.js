'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let envSchema = new Schema({
    name: { type: String },
    image: { type: String },
    service: { type: String }
});

let deploymentSchema = new Schema({
    name: { type: String },    
    environments: [envSchema]
});

let User = new Schema({
    googleId: { type: String, required: true },
    deployments: [deploymentSchema]
});

// static functions (available on schema)
User.statics.findOrCreate = function (query, user) {
    return this.findOne(query).exec().then(doc => {
        if(!doc) return this.create(user);
        return Promise.resolve(doc);
    });
};


User.statics.addDeploymentToUser = function (query, name) {
    return this.findOneAndUpdate(query, { $push: { "deployments": { name, environments: [] } } }, { new: true });
};

module.exports = mongoose.model('Users', User);