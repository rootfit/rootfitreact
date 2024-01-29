const express = require('express')
const router = express.Router()
const userDAO = require('./userDAO')

router.post('/signup', async (req, res, next) => {
  const data = req.body
  userDAO.signup(data, (resp) => {
    res.send(resp)
  })
})
router.post('/signin', (req, res, next) => {
  const data = req.body
  userDAO.signin(data, resp => {
    res.json(resp)
  })
})

module.exports = router