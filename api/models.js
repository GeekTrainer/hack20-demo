const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: String
});

module.exports.Dog = mongoose.model('dog', dogSchema);