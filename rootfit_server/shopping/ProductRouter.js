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
  // limits: { fileSize: 5 * 1024 * 1024 }
})

// 모든 상품 목록 가져오기
router.get('/product', (req, res, next) => {
  console.log('product', req.query.filter)
  ProductDAO.getAllProducts(req.query.filter, (result) => {
    res.status(result.status).json(result);
  });
});

// 메인페이지 상품 목록 가져오기
router.get('/product2', (req, res, next) => {
  console.log('product', req.query)
  ProductDAO.getHomeProducts(result => {
    res.json(result);
  });
});

// 특정 상품 가져오기
router.get('/product/:prodNum', (req, res, next) => {
  const prodNum = req.params.prodNum;
  ProductDAO.getProductById(prodNum, (result) => {
    res.json(result);
  });
});


// 상품 추가
router.post('/product', (req, res, next) => {
  const a1 = upload.fields([{ name: 'content', maxCount: 1 }, { name: 'image', maxCount: 1 }]);

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
      console.log('content', req.files.content[0].filename)
      console.log('image', req.files.image[0].filename)

      ProductDAO.addProduct(data.name, data.kind, data.price, req.files.content[0].filename, req.files.image[0].filename, (result) => {
        res.json({ status: 200, message: 'OK', data: "데이터 저장 성공." })
      })

    }
  })

})


// 상품 수정
router.put('/product/:prodNum', (req, res, next) => {
  const prodNum = req.params.prodNum;
  const updatedProduct = req.body; // 요청의 body에서 업데이트된 상품 정보를 가져옴
  ProductDAO.updateProduct(prodNum, updatedProduct, (result) => {
    res.status(result.status).json(result);
  });
});

// 상품 삭제
router.delete('/product/:prodNum', (req, res, next) => {
  const prodNum = req.params.prodNum;
  ProductDAO.deleteProduct(prodNum, (result) => {
    res.status(result.status).json(result);
  });
});

module.exports = router;