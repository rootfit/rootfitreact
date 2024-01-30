const express = require('express');
const router = express.Router();
const todoDAO = require('./TodoDAO');

// 유저에게 admin이 작성한 헬스리스트 목록을 보냄
router.get('/healthlist', function (req, res, next) {
  console.log('TodoRouter에서 healthlist 요청 확인...');
  todoDAO.healthlist((resp) => {
    res.json(resp);
  });
});

// 유저가 선택한 헬스리스트를 저장
router.get('/healthselect', function (req, res, next) {
  console.log('TodoRouter에서 healthselect 요청 확인...');
  todoDAO.healthselect((resp) => {
    res.json(resp);
  });
});

// 유저의 누적 데이터를 저장(작업중)
router.post('/healthselectinsert', function (req, res, next) {
  console.log('TodoRouter에서 healthselectinsert 요청 확인...');
  const data = req.body;
  todoDAO.healthselectinsert(data, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
