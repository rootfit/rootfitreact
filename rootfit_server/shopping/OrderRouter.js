const express = require('express');
const router = express.Router();
const OrderDAO = require('./OrderDAO');
const multer = require('multer')
const path = require('path');

// 모든 주문 조회
router.get('/order/:prodNum', async (req, res, next) => {
  const prodNum = req.params.prodNum;
  try {
    // Promise.all을 사용하여 두 개의 비동기 함수 호출
    const [ordersResult, usersResult] = await Promise.all([
      new Promise((resolve, reject) => {
        OrderDAO.getAllOrders(prodNum, (result) => {
          if (result.error) {
            reject(result.error);
          } else {
            resolve(result.data);
          }
        });
      }),
      new Promise((resolve, reject) => {
        OrderDAO.getUsers(id, email, nickname, addr, phone, (result) => {
          if (result.error) {
            reject(result.error);
          } else {
            resolve(result.data);
          }
        });
      })
    ]);

    // 두 개의 결과를 하나의 응답으로 합쳐서 클라이언트에게 보냄
    res.json({ orders: ordersResult, users: usersResult });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// 주문상품정보 DB 추가
router.post('/order', function(req, res, next)  {
  console.log('order router', req.body)
  const {id, prodNum, name, email, nickname, addr, phone, price } = req.body;
  OrderDAO.addOrder(id, prodNum, name, email, nickname, addr, phone, price, (resp) => {
    res.json(resp);
  });
})




module.exports = router;