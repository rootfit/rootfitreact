const express = require('express');
const router = express.Router();
const OrderDAO = require('./OrderDAO');

// 모든 주문 조회
router.get('/', (req, res, next) => {
  OrderDAO.getAllOrders((result) => {
    res.status(result.status).json(result);
  });
});


// 특정 주문 번호로 주문 조회
router.get('/:orderNum', (req, res, next) => {
  const orderNum = req.params.orderNum;
  OrderDAO.getOrderById(orderNum, (result) => {
    res.status(result.status).json(result);
  });
});

// 주문 추가
router.post('/', (req, res, next) => {
  const orderData = req.body; // assuming JSON data for the order
  OrderDAO.addOrder(orderData, (result) => {
    res.status(result.status).json(result);
  });
});

// 주문 수정
router.put('/:orderNum', (req, res, next) => {
  const orderNum = req.params.orderNum;
  const updatedOrder = req.body; // assuming JSON data for the updated order
  OrderDAO.updateOrder(orderNum, updatedOrder, (result) => {
    res.status(result.status).json(result);
  });
});

// 주문 삭제
router.delete('/:orderNum', (req, res, next) => {
  const orderNum = req.params.orderNum;
  OrderDAO.deleteOrder(orderNum, (result) => {
    res.status(result.status).json(result);
  });
});

// 주문에 속한 상품 조회  실제 구현할때 /products 가 구동되는지 확인 필요
router.get('/:orderNum/products', (req, res, next) => {
  const orderNum = req.params.orderNum;
  OrderDAO.getOrderProducts(orderNum, (result) => {
    res.status(result.status).json(result);
  });
});

module.exports = router;