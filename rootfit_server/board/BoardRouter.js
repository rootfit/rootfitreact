const express = require('express')
const router = express.Router()
const boardDAO = require('./BoardDAO')

router.get('/list', function (req, res, next) {
  console.log('list라우터 불러오기 ok')
  boardDAO.list((resp) => {
    res.json(resp)
  })
})

router.get('/detail/:id', function (req, res, next) {
  const id = req.params.id
  boardDAO.increaseCnt(id)
  boardDAO.detail(id, (resp) => {
    res.json(resp)
  }
  )
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