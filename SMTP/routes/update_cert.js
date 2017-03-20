/**
 * Created by rldnd on 2017-03-18.
 */
var express = require('express');
var router = express.Router();
var users = require('../models/user');
var fs=require('fs');

router.get('/', function(req, res){
    // GET 방식으로 데이터 쿼리를 전달받음
    var id = req.query.user_id;
    users.update({id:id}, {$set: {certification:"T"}}, function (err, output) {
        // 데이터 업x데이트
        if(err){
            console.error(err.message);
}
       /* fs.readFile('../certification screen/index.html',function(error,data) {
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
            // res.end('회원 인증이 완료되었습니다.');

        })*/
    });
});
router.get('/about', function(req, res){
    // GET 방식으로 데이터 쿼리를 전달받음
    var id = req.query.user_id;
        if(err){
            console.error(err.message);
        }
  /*      fs.readFile('../certification screen/index.html',function(error,data) {
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
            // res.end('회원 인증이 완료되었습니다.');

        })
*/
});

module.exports = router;