const express = require('express');
const router = express.Router();
const ProductDAO = require('./ProductDAO');

// 모든 상품 목록 가져오기
router.get('/', (req, res, next) => {
  ProductDAO.getAllProducts((result) => {
    res.status(result.status).json(result);
  });
});

// 특정 상품 가져오기
router.get('/:prodNum', (req, res, next) => {
  const prodNum = req.params.prodNum;
  ProductDAO.getProductById(prodNum, (result) => {
    res.status(result.status).json(result);
  });
});

// 상품 추가
router.post('/', (req, res, next) => {
  const product = req.body; // 요청의 body에서 상품 정보를 가져옴
  ProductDAO.addProduct(product, (result) => {
    res.status(result.status).json(result);
  });
});

// 상품 수정
router.put('/:prodNum', (req, res, next) => {
  const prodNum = req.params.prodNum;
  const updatedProduct = req.body; // 요청의 body에서 업데이트된 상품 정보를 가져옴
  ProductDAO.updateProduct(prodNum, updatedProduct, (result) => {
    res.status(result.status).json(result);
  });
});

// 상품 삭제
router.delete('/:prodNum', (req, res, next) => {
  const prodNum = req.params.prodNum;
  ProductDAO.deleteProduct(prodNum, (result) => {
    res.status(result.status).json(result);
  });
});

module.exports = router;