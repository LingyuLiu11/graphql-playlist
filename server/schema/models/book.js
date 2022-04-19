const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
    //no need to add id for object
});

module.exports = mongoose.model('Book', bookSchema);