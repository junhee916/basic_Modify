const userModel = require('../schemas/users')
const jwt = require('jsonwebtoken')

exports.users_get_all = (req, res) => {
    userModel
        .find()
        .then(users => {
            res.json({
                msg : "get users",
                count : users.length,
                userInfo : users.map(user => {
                    return{
                        id : user._id,
                        name : user.name,
                        nickname : user.nickname,
                        password : user.password,
                        profileImage : user.profileImage,
                        date : user.createdAt
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
};

exports.users_signup_user = async (req, res) => {

    const {name, nickname, password} = req.body

    try{

        const user = await userModel.findOne({nickname})
        if(user){
            return res.status(400).json({
                msg : 'user nickname, please other nickname'
            })
        }
        else{
            const user = new userModel({
                name, nickname, password
            })

            await user.save()

            res.json({user})
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }

};

exports.users_login_user = async (req, res) => {

    const {nickname, password} = req.body

    try{
        const user = await userModel.findOne({nickname})
        if(!user){
            return res.status(400).json({
                msg : 'user nickname, please other nickname'
            })
        }
        else{
            await user.comparePassword(password, (err, isMatch) => {

                if(err || !isMatch){
                    return res.status(401).json({
                        msg : 'not match password'
                    })
                }
                else{
                    const payload = {
                        id : user._id,
                        nickname : user.nickname
                    }

                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        {expiresIn: '1h'}
                    )

                    res.json({token})
                }
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

exports.users_delete_all = (req, res) => {

    userModel
        .remove()
        .then(() => {
            res.json({
                msg : "delete users"
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
};