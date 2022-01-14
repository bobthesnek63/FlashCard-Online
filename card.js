const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    name : String,
    info : String,
    url : String
});

const Card = mongoose.model('cards', CardSchema);

module.exports = Card;

