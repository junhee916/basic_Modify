const express = require('express')
const router = express.Router()
const Boards = require('../schemas/boards')
const authMiddleware = require('../auth-Middleware/authMiddleware')

router.post('/writes', authMiddleware, async(req, res)=> {
    let result = {status: 'success'};
    const {contents} = req.body
    const user = res.locals.user

    let boardId = await Boards.find({}).sort("-boardId").limit(1); 
    if (boardId.length == 0) { boardId = 1 } 
    else { boardId = boardId[0]['boardId'] + 1; }

    try{
        await Boards.create({
            boardId,
            nickname: user.nickname,
            contents
        })
        console.log("contents 작성 완료")
        res.json(result)

    }catch(err){
        console.log(err)
        result['status'] = 'fail'
    }

})

router.get('/writes',authMiddleware, async(req, res)=> {
    
    let result = {status: 'success', boardData: []}
    const user = res.locals.user
    try{
        let boardData = await Boards.find({}).sort({_id:-1}).limit(3);
        for (board of boardData){
            let temp={
                boardId:board["boardId"],
                nickname:board["nickname"],
                contents:board["contents"],
                profileImage:user.profileImage
            }
            result["boardData"].push(temp);
        }
    }catch(err){
        console.log(err)
        result['status'] = 'fail'
    }
    res.status(201).send({ board: result })

})

module.exports = router