const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userid: {
        type: String, 
        required: true
    },
    username: {
        type: String, 
        required: true
    }
});

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;