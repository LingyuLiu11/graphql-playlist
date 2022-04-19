const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number,
    //no need to add id for object
});

module.exports = mongoose.model('Author', authorSchema);