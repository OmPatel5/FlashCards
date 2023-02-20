const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    id: String,
    name: String,  
    icon: String, 
    quizIds: [String], 
});

const TopicModel = mongoose.model("topics", TopicSchema)
module.exports = TopicModel;