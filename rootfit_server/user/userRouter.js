const express = require('express')
const session = require('express-session')
const router = express.Router()
const userDAO = require('./userDAO')

router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

router.post('/signup', async (req, res, next) => {
  const data = req.body
  userDAO.signup(data, (resp) => {
    res.send(resp)
  })
})

router.post('/signin', (req, res, next) => {
  const data = req.body
  userDAO.signin(data, (resp) => {
    if(resp.status === 200) {
      req.session.userId = resp.data.id
    }
    res.json(resp)
  })
})

router.get('/member', (req, res, next) => {
  if (req.session.userId) {
    res.json({ status:200, message: '서버측 데이터 : ${req.session.userId} 님 환영합니다.'})
  } else {
    res.json({ status:200, message: '서버측 데이터 : 로그인하지 않은 유저의 요청입니다.' })
  }
})

router.get('/logout', (req, res, next) => {
  console.dir(req)
  res.clearCookie('connect.sid')
  res.json({ status:200, message: 'OK' })
  
})

module.exports = router