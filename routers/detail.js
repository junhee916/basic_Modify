const express = require('express')
const router = express.Router()
const Boards = require('../schemas/boards')
const authMiddleware = require('../auth-Middleware/authMiddleware')

router.get('/:boardId', async(req, res)=>{
    const {boardId} = req.params

    try{
        let board = await Boards.find({boardId: boardId})
        res.status(201).send({boards:board})
    }catch(err){
        console.log(err)
        result['status'] = 'fail'
    }

})

router.patch('/:boardId',authMiddleware, async(req, res)=>{
    const {boardId} = req.params
    const {contents} = req.body
    console.log(contents)

    try{
        await Boards.updateOne({boardId:boardId},{$set:{contents:contents}})
        res.status(201).send({result:"success"})
    }catch(err){
        console.log(err)
        result['status'] = 'fail'
    }

})

router.delete('/:boardId',authMiddleware, async(req, res)=>{
    const {boardId} = req.params

    try{
        await Boards.deleteOne({boardId:boardId})
        res.status(201).send({result:"success"})
    }catch(err){
        console.log(err)
        result['status'] = 'fail'
    }

})

module.exports = router