const express = require('express');
const router = express.Router();
const CartDAO = require('./CartDAO');

// 장바구니에 있는 상품 목록 조회
router.get('/:id', (req, res) => {
  const id = req.params.id;
  CartDAO.getAllItemsInCart(id, (result) => {
    res.json(result);
  });
});

// 장바구니에 상품 추가
router.post('/:id/add', (req, res) => {
  const id = req.params.id;
  const { prodNum, quantity } = req.body;

  if (!prodNum || !quantity) {
    return res.status(400).json({ status: 400, message: '상품 번호와 수량을 모두 입력하세요.' });
  }

  CartDAO.addItemToCart(id, prodNum, quantity, (result) => {
    res.json(result);
  });
});

// 장바구니에서 상품 삭제
router.delete('/remove/:cartNum', (req, res) => {
  const cartNum = req.params.cartNum;

  if (!cartNum) {
    return res.status(400).json({ status: 400, message: '장바구니 번호를 입력하세요.' });
  }

  CartDAO.removeItemFromCart(cartNum, (result) => {
    res.json(result);
  });
});

module.exports = router;