const mongoose = require('mongoose');

const CardsSchema = new mongoose.Schema({
    id: String,
    front: String, 
    back: String
});

const CardsModel = mongoose.model("cards", CardsSchema)
module.exports = CardsModel;