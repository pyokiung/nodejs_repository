/**
 * Created by rldnd on 2017-03-18.
 */
var express = require('express');
var router = express.Router();
var fs=require('fs');

// 라우팅 모듈
// 라우터 레벨 미들웨어를 구현할 수 있다.
// 사용 방법은 router.use()
/* GET home page. */
router.get('/', function(req, res, next) {
   fs.readFile(__dirname+'views/index.html',function (err,data) {
        if(err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
   });

    //res.render('index', { title: 'Express' });
});       /* index.jade파일을 html 형식으로 렌더링 작업*/

router.get('/about', function(req, res){
  //  res.render('index.html');
});
/*
router.post('/login', function(req, res){
    res.send("Login.");
});
*/
module.exports = router;
