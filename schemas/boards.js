const mongoose = require('mongoose')

const boardSchema = mongoose.Schema(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
            default : 'user'
        },
        contents : {
            type : String
        }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model('board', boardSchema)