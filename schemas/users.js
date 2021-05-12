  
const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({

    names :{
        type: String,
    },
    password : {
        type: String,
    },
    nickname : {
        type: String,
    },
    profileImage:{
        type: String 
    }
})

userSchema.virtual('userId').get(function () {
	return this._id.toHexString();
});

userSchema.set('toJSON', {
	virtuals: true
});


module.exports = mongoose.model("Users", userSchema)