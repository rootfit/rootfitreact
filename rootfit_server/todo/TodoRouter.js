const express = require('express');
const router = express.Router();
const todoDAO = require('./TodoDAO');

// 유저의 당일 헬스리스트 불러옴
router.get('/loadselect/:id', function (req, res, next) {
  console.log('TodoRouter에서 loadlist 요청 확인...');
  const id = req.params.id;
  todoDAO.loadselect(id, (resp) => {
    res.json(resp);
  });
});

// 유저의 1년 누적 데이터를 불러옴
router.post('/loadyear', function (req, res, next) {
  console.log('TodoRouter에서 loadayear 요청 확인...');
  const data = req.body;
  todoDAO.loadayear(data, (resp) => {
    res.json(resp);
  });
});

// admin이 작성한 헬스리스트를 불러옴
router.get('/healthlist', function (req, res, next) {
  console.log('TodoRouter에서 healthlist 요청 확인...');
  todoDAO.healthlist((resp) => {
    res.json(resp);
  });
});

// 유저의 누적 데이터 저장
router.post('/insertselect', function (req, res, next) {
  console.log('TodoRouter에서 insertselect 요청 확인...');
  const data = req.body;
  todoDAO.insertselect(data, (resp) => {
    res.json(resp);
  });
});

// 유저의 누적 데이터 업데이트
router.post('/updateselect', function (req, res, next) {
  console.log('TodoRouter에서 healthselect 요청 확인...');
  const data = req.body;
  todoDAO.updateselect(data, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
