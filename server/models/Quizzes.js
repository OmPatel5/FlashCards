const mongoose = require('mongoose');

const QuizzesSchema = new mongoose.Schema({
    id: String,
    topicId: String,  
    name: String, 
    cardIds: [String],
    createdBy: String // createdBy
});

const QuizzesModel = mongoose.model("quizzes", QuizzesSchema)
module.exports = QuizzesModel;