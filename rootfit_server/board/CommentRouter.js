const express = require('express')
const router = express.Router()
const commentDAO = require('./CommentDAO')

// 댓글 목록 가져오기
router.get('/comments/:board_id', function(req,res,next){
  console.log('댓글목록 라우터')
  const boardId = req.params.board_id
  commentDAO.getComments(boardId, (resp)=>{
    res.json(resp)
  })
} )

// 글에 댓글 추가
router.post('/addcomment/:id',function(req, res,next){
  const data = req.body
  console.log('댓글추가 라우터')
  commentDAO.addComment(data,(resp)=>{
    res.json(resp)
  })
})

// 댓글 삭제
router.get('/deletecomment/:id',function(req,res,next){
  console.log('00')
  const data = req.params.id
  
  commentDAO.deleteComment(data,(resp)=>{
    res.json(resp)
  })
})

// // 댓글 수정
// router.post('/updatecomment/:id',function(req,res,next){
//   const data = req.body.id
//   commentDAO.update(data,(resp)=>{
//     res.json(resp)
//   })
// })

module.exports = router