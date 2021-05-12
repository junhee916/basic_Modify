const express = require('express')
const authMiddleware = require('../auth-Middleware/authMiddleware')
const {
    boards_delete_board,
    boards_get_all,
    boards_patch_board,
    boards_post_boards
} = require('../controller/board')
const router = express.Router()

// total get board
router.get('/', boards_get_all)

// register board
router.post('/', authMiddleware, boards_post_boards)

// update board
router.patch('/:boardId', authMiddleware, boards_patch_board)

// detail delete board
router.delete('/:boardId', authMiddleware, boards_delete_board)

module.exports = router