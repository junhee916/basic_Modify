const mongoose = require("mongoose");

const {Schema} = mongoose;
const boardSchema = new Schema({
    boardId:{
        type: Number,
    },
    contents : {
        type: String,
    },
    nickname : {
        type: String,
    }
})


module.exports = mongoose.model("Boards", boardSchema)