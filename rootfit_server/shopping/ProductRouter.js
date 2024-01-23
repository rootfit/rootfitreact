var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next){
  //index.html 이 출력되면서 그곳에 {} 정보 넘긴것.. 
  //nunjucks 설정이 app.js 에 되어 있어야 하고.. 
  res.render('index', {title: 'Express'})
})

module.exports = router