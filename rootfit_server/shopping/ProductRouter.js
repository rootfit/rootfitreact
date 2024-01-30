const express = require('express');
const router = express.Router();
const multer = require('multer')
const ProductDAO = require('./ProductDAO');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'public/upload/')
    },
    filename(req, file, done) {

      const ext = path.extname(file.originalname)
      done(null, path.basename(file.originalname, ext) + Date.now() + ext)
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
})


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
  const a1 = upload.single('image');

  a1(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err)
      res.json({ status: 500, message: 'error' })
    } else if (err) {
      console.log(err)
      res.json({ status: 500, message: 'error' })
    } else {
      console.log('upload router....')
      const data = req.body
      console.log('name', data.name)
      console.log('kind', data.kind)
      console.log('price', data.price)
      console.log('content', data.content)
      console.log('image', req.file.filename)
      res.json({ status: 200, message: 'OK', data: req.file.filename })
    }
  })

})

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