var express = require('express');
var router = express.Router();

// 라우팅 모듈
// 라우터 레벨 미들웨어를 구현할 수 있다.
// 사용 방법은 router.use()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});       /* index.jade파일을 html 형식으로 렌더링 작업*/

router.get('/about', function(req, res){
  res.send("Welcome\nAbout.");
});

router.post('/login', function(req, res){
  res.send("Login.");
});

module.exports = router;
