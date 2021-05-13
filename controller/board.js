const boardModel = require('../schemas/boards')

exports.boards_get_all = (req, res) => {

    boardModel
        .find()
        .populate('userId', ['nickname', 'profileImage'])
        .then(boards => {
            res.json({
                msg : "get boards",
                count : boards.length,
                boardInfo : boards.map(board => {
                    return{
                        id : board._id,
                        userId : board.userId,
                        contents : board.contents,
                        date : board.createdAt
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

exports.boards_post_boards = (req, res) => {

    const {userId, contents} = req.body

    const newBoard = new boardModel(
        {
            userId,
            contents
        }
    )

    newBoard
        .save()
        .then(board => {
            res.json({
                msg : "register board",
                boardInfo : {
                    id : board._id,
                    userId : board.userId,
                    contents : board.contents,
                    date : board.createdAt
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
};

exports.boards_patch_board = (req, res) => {
    const id = req.params.boardId

    const updateOps = {}

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }

    boardModel
        .findByIdAndUpdate(id, {$set : updateOps})
        .then(board => {
            if(!board){
                return res.status(402).json({
                    msg : 'no user id'
                })
            }
            res.json({
                msg : "update board by " + id
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
};

exports.boards_delete_board = (req, res) => {

    const id = req.params.boardId

    boardModel
        .findByIdAndRemove(id)
        .then(board => {
            if(!board){
                return res.status(402).json({
                    msg : "no user id"
                })
            }
            res.json({
                msg : "delete board by " + id
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
};

