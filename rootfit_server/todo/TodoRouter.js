const express = require('express');
const router = express.Router();
const todoDAO = require('./TodoDAO');

// 유저 요청이 들어왔다.

router.get('/healthlist', function (req, res, next) {
  console.log('TodoRouter에서 healthlist 요청 확인...');
  todoDAO.healthlist((resp) => {
    res.json(resp);
  });
});

module.exports = router;
