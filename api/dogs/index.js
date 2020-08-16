const mongoose = require('mongoose');
const models = require('../models');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true});

module.exports = async function (context, req) {
    // grab the response to setup what's going to be sent to the client
    const response = context.res = {'Content-Type': 'application/json'}

    if (req.method === 'POST') {
        // add new dog
        if (req.body && req.body.name) {
            const dog = await models.Dog.create({ name: req.body.name });
            response.body = dog;
        } else {
            response.status = 400;
        }
    } else {
        // return all dogs
        response.body = {
            dogs: await models.Dog.find({}).exec()
        };
    }
};
