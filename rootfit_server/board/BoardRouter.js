const express = require('express')
const router = express.Router()
const boardDAO = require('./BoardDAO')
// 글 목록
router.get('/list', function (req, res, next) {
  console.log('list라우터 불러오기 ok')
  boardDAO.list((resp) => {
    res.json(resp)
  })
})
// 글 상세보기
router.get('/detail/:id', function (req, res, next) {
  const id = req.params.id
  boardDAO.increaseCnt(id)
  boardDAO.detail(id, (resp) => {
    res.json(resp)
  }
  )
})
// 조회수 필터
router.get('/mostview',function(req, res,next){
  console.log('정렬라우터ok')
  boardDAO.mostview((resp)=>{
    res.json(resp)
  })
})

// 댓글 목록 가져오기
router.get('/comments/:id', function(req,res,next){
  console.log('댓글목록 라우터')
  const id = req.params.id
  boardDAO.getComments(id, (resp)=>{
    res.json(resp)
  })
} )

// 글에 댓글 추가
router.post('/addcomment/:id',function(req, res,next){
  const data = req.body
  console.log('댓글추가 라우터')
  boardDAO.addComment(data,(resp)=>{
    res.json(resp)
  })
})

//이전글, 다음글
router.get('/prevnext/:id', async (req, res,next) => {
  const id  = req.params.id
  boardDAO.getPrevNextPostIds(id, (resp) => {
    res.json(resp)
  })
})
    
  

// router.post('/insert',function(req,res,next){
//   const data = req.body
//   boardDAO.insert(data,(resp)=>{
//     res.json(resp)
//   })
// })

// router.post('/delete/:id',function(req,res,next){
//   const id = rep.params.id
//   boardDAO.update(data,(resp)=>{
//     res.json(resp)
//   })
// })

// reouter.post('/update',function(req,res,next){
//   const data = req.body
//   boardDAO.update(data,(resp)=>{
//     res.json(resp)
//   })
// })

module.exports = router